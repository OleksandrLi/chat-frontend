import { createAsyncThunk } from "@reduxjs/toolkit";
import { OneUserResponse, UsersResponse } from "../types";
import { getOneUserAPI, getUsersAPI } from "../api";

export const getUsersThunk = createAsyncThunk<
  UsersResponse,
  undefined,
  { rejectValue: string }
>("get_users", async (data, thunkAPI) => {
  try {
    const response = await getUsersAPI();

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const getOneUserThunk = createAsyncThunk<
  OneUserResponse,
  number,
  { rejectValue: string }
>("get_one_user", async (id, thunkAPI) => {
  try {
    const response = await getOneUserAPI(id);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});
