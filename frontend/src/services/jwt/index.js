import jwtConfig from "./config";
import router from "@/router";

export function getToken() {
  return localStorage.getItem(jwtConfig.STORAGE_TOKEN_KEY_NAME);
}

export function deleteToken() {
  localStorage.removeItem(jwtConfig.STORAGE_TOKEN_KEY_NAME);
}

export function setToken(value) {
  localStorage.setItem(jwtConfig.STORAGE_TOKEN_KEY_NAME, value);
}

export function fillAxiosHeader(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        if (config.headers) {
          config.headers["Authorization"] = `${jwtConfig.TOKEN_TYPE} ${token}`;
        }
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return axiosInstance;
}

export function handleUnauthorizedRequest(axiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.response.status === 403 &&
        !originalRequest._retry
      ) {
        deleteToken();
        router.push("/login");
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
  return axiosInstance;
}
