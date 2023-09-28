import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateRoomRequest,
  Message,
  OneUserResponse,
  RoomResponse,
  RoomsResponse,
  SendMessageRequest,
  UsersResponse,
} from "../types";
import {
  getChatWithUserAPI,
  getOneUserAPI,
  getUsersAPI,
  createChatWithUserAPI,
  sendMessageAPI,
  getChatByRoomIdAPI,
  getActiveChatsAPI,
  readMessagesAPI,
} from "../api";

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

export const getChatByUsersThunk = createAsyncThunk<
  RoomResponse,
  number,
  { rejectValue: string }
>("get-chat-by-users-thunk", async (userId, thunkAPI) => {
  try {
    const response = await getChatWithUserAPI(userId);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const getChatByRoomIdThunk = createAsyncThunk<
  RoomResponse,
  string,
  { rejectValue: string }
>("get-chat-by-room-id", async (roomId, thunkAPI) => {
  try {
    const response = await getChatByRoomIdAPI(roomId);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const createChatWithUserThunk = createAsyncThunk<
  RoomResponse,
  CreateRoomRequest,
  { rejectValue: string }
>("create-chat", async (data, thunkAPI) => {
  try {
    const response = await createChatWithUserAPI(data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const sendMessageThunk = createAsyncThunk<
  Message,
  SendMessageRequest,
  { rejectValue: string }
>("send-message", async (data, thunkAPI) => {
  try {
    const response = await sendMessageAPI(data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const getActiveChatsThunk = createAsyncThunk<
  RoomsResponse,
  undefined,
  { rejectValue: string }
>("get-active-chats-thunk", async (_, thunkAPI) => {
  try {
    const response = await getActiveChatsAPI();

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});

export const onReadMessagesThunk = createAsyncThunk<
  undefined,
  string,
  { rejectValue: string }
>("read-messages", async (roomId, thunkAPI) => {
  try {
    const response = await readMessagesAPI(roomId);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error!");
  }
});
