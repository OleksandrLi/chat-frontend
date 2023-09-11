import { AxiosResponse } from "axios";

import api from "../../../api";
import {
  UserSignUpData,
  LoginResponse,
  ProfileResponse,
  TokensResponse,
  UpdateAvatarParam,
  UpdateAvatarResponse,
} from "../types";

const configForAvatar = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const signUpAPI = async (
  data: UserSignUpData
): Promise<AxiosResponse<LoginResponse>> => {
  return api.post<LoginResponse>("/authentication/sign-up", data);
};

export const loginAPI = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> => {
  return api.post<LoginResponse>("/authentication/sign-in", {
    email,
    password,
  });
};

export const getProfileAPI = async () => {
  return await api.get<ProfileResponse>(`/users/profile`);
};

export const refreshTokensAPI = async (refresh?: string | null) => {
  return await api.post<TokensResponse>(`/authentication/refresh-tokens`, {
    refreshToken: refresh,
  });
};

export const updateAvatarAPI = async (
  data: UpdateAvatarParam
): Promise<AxiosResponse<UpdateAvatarResponse>> => {
  return api.post<UpdateAvatarResponse>(
    "/users/update-avatar",
    data,
    configForAvatar
  );
};
