/* eslint-disable @typescript-eslint/no-explicit-any */
import { appConfig } from "@/config/appConfig";
import axios from "axios";

const instance = axios.create({
	baseURL: appConfig.SERVER_URL,
	timeout: 5000,
	headers: { "X-Custom-Header": "foobar" },
});

let isRefreshing = false;
let failedQueue: any[] = [];

// Hàm xử lý queue
const processQueue = (error: any, token = null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject(error);
		}
	});
	failedQueue = [];
};

const refreshToken = async () => {
	const response = await axios.get(`${appConfig.SERVER_URL}/auth/refresh`, {
		withCredentials: true,
	});
	return response?.data?.accessToken;
};

instance.interceptors.request.use(
	async function (config) {
		config.withCredentials = true;

		return config;
	},
	function (error) {
		console.log("error", error);

		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		console.log("error.response.status", error.response.status);

		if (error.response.status === 401) {
			originalRequest._retry = true;

			if (isRefreshing) {
				// Nếu đang làm mới token, thêm request vào queue
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						// Gắn token mới vào request
						originalRequest.headers["Authorization"] = `Bearer ${token}`;
						return instance(originalRequest); // Gửi lại request
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}
			isRefreshing = true;
			try {
				const newToken = await refreshToken();
				instance.defaults.headers.common[
					"Authorization"
				] = `Bearer ${newToken}`;
				originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
				processQueue(null, newToken);
				return instance(originalRequest);
			} catch (refreshError) {
				console.error("Refresh token failed", refreshError);
				processQueue(refreshError, null);
				return Promise.reject(refreshError);
			}
		}

		if (error.response.status === 413) {
			instance.defaults.headers.common["Authorization"] = null;
			window.location.href = "/auth/login";
		}

		return Promise.reject(error);
	},
);

export default instance;
