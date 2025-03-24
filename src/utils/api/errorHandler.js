// src/api/errorHandler.js
import axios from "axios";
import axiosInstance from "./axiosInstance";

// Default error handler
export function defaultErrorHandler(status, message) {
    console.error(`Error ${status || "Unknown"}: ${message}`);
}

// Setup response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        const status = error.response?.status;
        const config = error.config || {};
        const customErrorHandler = config.errorHandler || defaultErrorHandler;

        switch (status) {
            case 403:
                customErrorHandler(status, "Forbidden: You don’t have permission.");
                break;
            case 404:
                customErrorHandler(status, "Not Found: Resource doesn’t exist.");
                break;
            case 400:
                customErrorHandler(status, "Bad Request: Invalid input.");
                break;
            case 500:
            case 502:
            case 503:
            case 504:
                customErrorHandler(status, "Server Error: Something went wrong.");
                break;
            default:
                if (!status) customErrorHandler(null, "Network Error: Check your connection.");
        }
        return Promise.reject(error);
    },
);
