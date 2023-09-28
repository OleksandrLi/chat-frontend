import axios, { HeadersDefaults } from "axios";
import { API_URL } from "../constants/config";
import {
  clearStorage,
  getAccessWithLocalStorage,
  getAccessWithSessionStorage,
  getRefreshWithLocalStorage,
  getRefreshWithSessionStorage,
  saveAccessInLocalStorage,
  saveRefreshInLocalStorage,
  saveRefreshInSessionStorage,
  STORAGE_KEYS,
} from "../utils/localStorage";
import ROUTES from "../routes/constants";
import { refreshTokensAPI } from "../features/auth/api";

const api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization?: string;
}
api.interceptors.request.use((config) => {
  const token = getAccessWithLocalStorage();
  const sessionToken = getAccessWithSessionStorage();
  if (token || sessionToken) {
    (config.headers as unknown as CommonHeaderProperties)[
      "Authorization"
    ] = `Bearer ${token || sessionToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshWithLocalStorage = getRefreshWithLocalStorage();
        const refreshWithSessionStorage = getRefreshWithSessionStorage();

        const response = await refreshTokensAPI(
          refreshWithLocalStorage || refreshWithSessionStorage
        );
        const { refreshToken, accessToken } = response.data;

        if (refreshWithLocalStorage && !refreshWithSessionStorage) {
          saveAccessInLocalStorage(accessToken);
          saveRefreshInLocalStorage(refreshToken);
        }
        if (!refreshWithLocalStorage && refreshWithSessionStorage) {
          saveRefreshInSessionStorage(accessToken);
          saveRefreshInSessionStorage(refreshToken);
        }
        return api.request(originalRequest);
      } catch (e) {
        clearStorage(STORAGE_KEYS.access);
        clearStorage(STORAGE_KEYS.refresh);
        clearStorage(STORAGE_KEYS.currentAccount);
        window.location.href = `${window.location.origin}${ROUTES.login}`;
      }
    }
    throw error;
  }
);

export default api;
