// src/api/axiosInstance.js
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import Constants from "/constants/";

const INFINITE_TTL = 100 * 365 * 24 * 60 * 60 * 1000; // 100 years in milliseconds

const axiosInstance = setupCache(
    axios.create({
        baseURL: Constants("api_base_url"),
    }),
    {
        ttl: 0, // Default to no caching at instance level
        staleIfError: false,
    },
);

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken") || "";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor (minimal, as refresh logic is in auth.js)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Let auth.js handle 401 errors via its interceptor
        return Promise.reject(error);
    },
);

const getCacheTTL = (seconds) => (seconds === -1 ? INFINITE_TTL : seconds * 1000);

const clearCache = () => axiosInstance.storage.clear();

export default axiosInstance;
export { getCacheTTL, clearCache };
