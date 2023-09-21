import { useCallback } from "react";

import { useAppSelector, useAppDispatch } from "../../../store";

import {
  signUpThunk,
  loginThunk,
  getProfileThunk,
  refreshTokensThunk,
  updateAvatarThunk,
} from "../redux/thunk";
import { UserSignUpData, LoginParams } from "../types";
import { clearStorage, STORAGE_KEYS } from "../../../utils/localStorage";
import { removeToken } from "../redux/slice";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);

  const onSignUp = useCallback(
    (param: UserSignUpData) => {
      dispatch(signUpThunk(param));
    },
    [dispatch]
  );

  const onLogin = useCallback(
    (params: LoginParams) => {
      dispatch(loginThunk(params));
    },
    [dispatch]
  );

  const onGetProfile = useCallback(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  const onLogout = useCallback(() => {
    clearStorage(STORAGE_KEYS.access);
    clearStorage(STORAGE_KEYS.refresh);
    clearStorage(STORAGE_KEYS.currentAccount);
    dispatch(removeToken());
  }, [dispatch]);

  const onRefreshTokens = useCallback(
    (token?: string | null) => {
      dispatch(refreshTokensThunk(token));
    },
    [dispatch]
  );

  const onUpdateAvatar = useCallback(
    (data: any) => {
      dispatch(updateAvatarThunk(data));
    },
    [dispatch]
  );

  return {
    ...state,
    onSignUp,
    onLogin,
    onGetProfile,
    onLogout,
    onRefreshTokens,
    onUpdateAvatar,
  };
}
