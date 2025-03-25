// src/api/axiosInstance.js
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import Constants from "/constants/";
import AuthStore, { ACCESS_TOKEN } from '/src/store/auth';

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
    if (config.url === '/oauth/token') return config;
    const token = AuthStore.get(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const getCacheTTL = (seconds) => (seconds === -1 ? INFINITE_TTL : seconds * 1000);

const clearCache = () => axiosInstance.storage.clear();

export default axiosInstance;
export { getCacheTTL, clearCache };
