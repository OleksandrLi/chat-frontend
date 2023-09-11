interface User {
  id: number;
  name: string;
  email: string;
  image: string;
}

interface UserSignUpData {
  name: string;
  email: string;
  password: string;
  successFn: () => void;
  errorFn: (error: any) => void;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  accessTokenExpiresAt: string;
  user: User;
}

interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface LoginParams {
  data: {
    email: string;
    password: string;
  };
  successFn: () => void;
  errorFn: (error: any) => void;
}

interface ProfileResponse {
  profile: User;
}

interface ProfileResponse {
  profile: User;
}
interface UpdateAvatarParam {
  image: File;
}
interface UpdateAvatarResponse {
  image: string;
}

export type {
  User,
  UserSignUpData,
  LoginResponse,
  LoginParams,
  ProfileResponse,
  TokensResponse,
  UpdateAvatarParam,
  UpdateAvatarResponse,
};
