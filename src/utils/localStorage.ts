export enum STORAGE_KEYS {
  access = "access",
  refresh = "refresh",
  currentAccount = "currentAccount",
}

export const clearStorage = (key: STORAGE_KEYS) => {
  localStorage.removeItem(STORAGE_KEYS[key]);
  sessionStorage.removeItem(STORAGE_KEYS[key]);
};

export const getLocalStorage = (key: STORAGE_KEYS): string | null =>
  localStorage.getItem(STORAGE_KEYS[key]);
export const setLocalStorage = (key: STORAGE_KEYS, value?: string) => {
  value && localStorage.setItem(STORAGE_KEYS[key], value);
};
export const clearLocalStorage = (key: STORAGE_KEYS) => {
  localStorage.removeItem(STORAGE_KEYS[key]);
};

export const getSessionStorage = (key: STORAGE_KEYS): string | null =>
  sessionStorage.getItem(STORAGE_KEYS[key]);
export const setSessionStorage = (key: STORAGE_KEYS, value?: string) => {
  value && sessionStorage.setItem(STORAGE_KEYS[key], value);
};
export const clearSessionStorage = (key: STORAGE_KEYS) => {
  sessionStorage.removeItem(STORAGE_KEYS[key]);
};

export const saveAccessInLocalStorage = (token: string) => {
  token && setLocalStorage(STORAGE_KEYS.access, token);
};
export const saveRefreshInLocalStorage = (token: string) => {
  token && setLocalStorage(STORAGE_KEYS.refresh, token);
};

export const saveAccessInSessionStorage = (token: string) => {
  token && setSessionStorage(STORAGE_KEYS.access, token);
};
export const saveRefreshInSessionStorage = (token: string) => {
  token && setSessionStorage(STORAGE_KEYS.refresh, token);
};

export const getAccessWithLocalStorage = (): string | null =>
  getLocalStorage(STORAGE_KEYS.access);

export const getRefreshWithLocalStorage = (): string | null =>
  getLocalStorage(STORAGE_KEYS.refresh);

export const getAccessWithSessionStorage = (): string | null =>
  getSessionStorage(STORAGE_KEYS.access);

export const getRefreshWithSessionStorage = (): string | null =>
  getSessionStorage(STORAGE_KEYS.refresh);
