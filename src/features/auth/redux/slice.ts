import { createSlice } from "@reduxjs/toolkit";

import {
  signUpThunk,
  loginThunk,
  getProfileThunk,
  refreshTokensThunk,
  updateAvatarThunk,
} from "./thunk";
import { User } from "../types";

const initialState = {
  isAuth: false,
  isLoading: false,
  error: "" as undefined | string,
  currentUser: {} as User,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state) {
      state.isAuth = true;
    },
    removeToken(state) {
      state.isAuth = false;
      state.currentUser = {} as User;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload.user;
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.currentUser = payload.user;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getProfileThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfileThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.currentUser = payload.profile;
    });
    builder.addCase(getProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(refreshTokensThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refreshTokensThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuth = true;
    });
    builder.addCase(refreshTokensThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateAvatarThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAvatarThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.currentUser.image = payload.image;
    });
    builder.addCase(updateAvatarThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
