import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  signUpAPI,
  loginAPI,
  getProfileAPI,
  refreshTokensAPI,
  updateAvatarAPI,
} from "../api";
import {
  UserSignUpData,
  LoginResponse,
  LoginParams,
  ProfileResponse,
  TokensResponse,
  UpdateAvatarParam,
  UpdateAvatarResponse,
} from "../types";
import {
  saveRefreshInLocalStorage,
  saveAccessInLocalStorage,
  setSessionStorage,
  STORAGE_KEYS,
  setLocalStorage,
  clearStorage,
} from "../../../utils/localStorage";

export const signUpThunk = createAsyncThunk<
  LoginResponse,
  UserSignUpData,
  { rejectValue: string }
>("sign_up", async (data, thunkAPI) => {
  try {
    const response = await signUpAPI(data);
    const { accessToken, refreshToken, user } = response.data;

    saveRefreshInLocalStorage(refreshToken);
    saveAccessInLocalStorage(accessToken);
    setLocalStorage(STORAGE_KEYS.currentAccount, JSON.stringify(user));

    data.successFn();
    return response.data;
    throw new AxiosError();
  } catch (error) {
    if (error instanceof AxiosError) {
      const errors = error?.response?.data?.errors;
      if (typeof errors === "object") {
        data.errorFn(errors);
      } else {
        data.errorFn({ message: error?.response?.data.message });
      }
    }
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginParams,
  { rejectValue: string }
>("login", async ({ data, successFn, errorFn }, thunkAPI) => {
  try {
    const response = await loginAPI(data.email, data.password);
    const { accessToken, refreshToken, user } = response.data;

    saveRefreshInLocalStorage(refreshToken);
    saveAccessInLocalStorage(accessToken);
    setLocalStorage(STORAGE_KEYS.currentAccount, JSON.stringify(user));

    successFn();
    return response.data;
    throw new AxiosError();
  } catch (error) {
    if (error instanceof AxiosError) {
      const errors = error?.response?.data?.errors;
      if (typeof errors === "object") {
        errorFn(errors);
      } else {
        errorFn({ message: error?.response?.data.message });
      }
    }
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const getProfileThunk = createAsyncThunk<
  ProfileResponse,
  undefined,
  { rejectValue: string }
>("get-profile", async (_, thunkAPI) => {
  try {
    const { data } = await getProfileAPI();

    setSessionStorage(
      STORAGE_KEYS.currentAccount,
      JSON.stringify(data.profile)
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const refreshTokensThunk = createAsyncThunk<
  TokensResponse,
  string | undefined | null,
  { rejectValue: string }
>("refresh-tokens", async (token, thunkAPI) => {
  try {
    const response = await refreshTokensAPI(token);
    const { refreshToken, accessToken } = response.data;

    saveRefreshInLocalStorage(refreshToken);
    saveAccessInLocalStorage(accessToken);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status === 406) {
        clearStorage(STORAGE_KEYS.access);
        clearStorage(STORAGE_KEYS.refresh);
        clearStorage(STORAGE_KEYS.currentAccount);
      }
    }
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const updateAvatarThunk = createAsyncThunk<
  UpdateAvatarResponse,
  UpdateAvatarParam,
  { rejectValue: string }
>("update_avatar", async (data, thunkAPI) => {
  try {
    const response = await updateAvatarAPI(data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});
