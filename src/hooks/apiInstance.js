import axios from "axios";
import { refreshToken } from "../app/features/auth/authService";
import { useRedirectToLogin } from "./useNavigate";
import store from "../app/store";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_URI,
});

apiInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const result = await store.dispatch(refreshToken());
        if (refreshToken.fulfilled.match(result)) {
          apiInstance.defaults.headers.Authorization = `Bearer ${result.payload.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${result.payload.accessToken}`;
          return apiInstance(originalRequest);
        }
      } catch (error) {
        useRedirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
