import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

interface BaseResponse {
  code: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  error: boolean;
  message: string;
  success: boolean;
}

export interface SuccessResponse<T> extends BaseResponse {
  data: T;
  error: false;
  success: true;
}

export interface ErrorResponse extends BaseResponse {
  data: null;
  error: true;
  success: false;
}

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize all error responses
    const normalizedError = {
      message: "An error occurred", // Default message
      statusCode: error.response?.status || 500, // Status code (default to 500)
      data: {},
    };

    if (error.response) {
      normalizedError.message = error.response.data.message || "Request failed";
      normalizedError.data = error.response.data;
    } else if (error.request)
      normalizedError.message = "No response from server";
    else normalizedError.message = error.message || "Unknown error";

    return Promise.reject(normalizedError);
  },
);

export default apiClient;
