import AuthStore, { ACCESS_TOKEN, REFRESH_TOKEN } from "/src/store/auth";
import UserStore from "/src/store/user";
import { post, axiosInstance, clearCache } from "./api/";
import Constants from "/constants/";

// Track if a refresh is in progress
let isRefreshing = false;
let failedQueue = [];

/**
 * Processes the queue of failed requests after token refresh
 * @param {Error|null} error - Error if refresh failed, null if successful
 * @param {string|null} token - New access token if successful
 */
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

/**
 * Performs initial login by posting credentials to /oauth/token
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise<boolean>} - True if login succeeds, throws error if fails
 */
export async function login(username, password) {
    try {
        const response = await post("/oauth/token", {
            grant_type: "password",
            client_id: Constants("api_client_id"),
            client_secret: Constants("api_client_secret"),
            scope: Constants("api_scope"),
            username,
            password,
        });

        const { access_token, refresh_token } = response; // Expecting both tokens
        AuthStore.set(ACCESS_TOKEN, access_token);
        AuthStore.set(REFRESH_TOKEN, refresh_token);

        window.location.href = "/"; // Redirect to home
    } catch (error) {
        if (error.status === 400) {
            throw new Error("These credentials do not match our records.");
        }
        throw error;
    }
}

/**
 * Checks if the user is authenticated
 * @returns {boolean} - True if access token exists
 */
export function isAuthenticated() {
    return !!AuthStore.get(ACCESS_TOKEN);
}

/**
 * Refreshes the access token using the refresh token
 * @returns {Promise<string>} - New access token
 */
async function refreshAccessToken() {
    const refreshToken = AuthStore.get(REFRESH_TOKEN);
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await post("/oauth/token", {
            grant_type: "refresh_token",
            client_id: Constants("api_client_id"),
            client_secret: Constants("api_client_secret"),
            scope: Constants("api_scope"),
            refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = response;
        AuthStore.set(ACCESS_TOKEN, access_token);
        AuthStore.set(REFRESH_TOKEN, refresh_token); // Update refresh token if provided

        return access_token;
    } catch (error) {
        throw new Error("Refresh token expired or invalid");
    }
}

/**
 * Logs out the user by clearing tokens and cache
 */
export function logout() {
    UserStore.reset();
    AuthStore.reset();
    clearCache();
}

// Configure axios interceptor for 401 handling with refresh token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            originalRequest.url !== "/oauth/token" &&
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                // Queue the request if refresh is already in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const newToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // Process queued requests with the new token
                processQueue(null, newToken);
                return axiosInstance(originalRequest); // Retry original request
            } catch (refreshError) {
                processQueue(refreshError);
                logout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    },
);
