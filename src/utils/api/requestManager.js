// src/api/requestManager.js
import axios from "axios";
import axiosInstance, { getCacheTTL } from "./axiosInstance";

const cancelTokens = new Map();

async function request(method, url, data = {}, config = {}, callback) {
    const requestKey = `${method}-${url}-${JSON.stringify(config.params || {})}`;

    if (cancelTokens.has(requestKey)) {
        cancelTokens.get(requestKey).cancel("Duplicate request cancelled");
    }

    const source = axios.CancelToken.source();
    cancelTokens.set(requestKey, source);

    const finalConfig = {
        method,
        url,
        data,
        params: config.params,
        responseType: config.responseType || undefined,
        cancelToken: source.token,
        errorHandler: config.errorHandler,
        cache: config.cacheTTL
            ? { ttl: getCacheTTL(config.cacheTTL), interpretHeader: false }
            : false,
    };

    if (typeof callback === "function") {
        callback({
            isFetching: true,
            isError: false,
            isSuccess: false,
            error: null,
            data: null,
            headers: null,
            requestKey,
        });
    }

    try {
        const response = await axiosInstance(finalConfig);
        cancelTokens.delete(requestKey);

        if (typeof callback === "function") {
            callback({
                isFetching: false,
                isError: false,
                isSuccess: true,
                error: null,
                data: response.data,
                headers: response.headers,
            });
        }

        return response.data;
    } catch (error) {
        cancelTokens.delete(requestKey);

        if (axios.isCancel(error) || typeof callback === "function") {
            callback({
                isFetching: false,
                isError: true,
                isSuccess: false,
                error: error.message,
                data: null,
                headers: null,
            });
        }

        throw error;
    }
}

export const get = (url, config = {}, callback) => request("get", url, {}, config, callback);
export const post = (url, data, config = {}, callback) =>
    request("post", url, data, config, callback);

export function cancelPendingRequests() {
    cancelTokens.forEach((source) => source.cancel("Navigation cancelled"));
    cancelTokens.clear();
}

export function cancelRequest(requestKey) {
    if (cancelTokens.has(requestKey)) {
        cancelTokens.get(requestKey).cancel("Request cancelled");
        cancelTokens.delete(requestKey);
    }
}
