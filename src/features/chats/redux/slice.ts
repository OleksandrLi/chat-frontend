import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../auth/types";
import { getOneUserThunk, getUsersThunk } from "./thunk";

const initialState = {
  isAuth: false,
  isLoading: false,
  error: "" as undefined | string,
  users: [] as User[],
  selectedUser: {} as User,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.users = payload.users;
    });
    builder.addCase(getUsersThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getOneUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.selectedUser = payload.user;
    });
    builder.addCase(getOneUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default chatsSlice.reducer;
