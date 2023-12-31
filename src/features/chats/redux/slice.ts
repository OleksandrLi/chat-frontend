import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../auth/types";
import {
  createChatWithUserThunk,
  getActiveChatsThunk,
  getChatByRoomIdThunk,
  getChatByUsersThunk,
  getOneUserThunk,
  getUsersThunk,
  onReadMessagesThunk,
  sendMessageThunk,
} from "./thunk";
import { IRoom } from "../types";
import { OnlineOfflineStatusEvent } from "../../../constants/types";

const initialState = {
  isAuth: false,
  isLoading: false,
  error: "" as undefined | string,
  users: [] as User[],
  selectedUser: {} as User,
  activeChat: null as null | IRoom,
  chats: [] as IRoom[],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<OnlineOfflineStatusEvent>) => {
      state.selectedUser =
        state.selectedUser?.id === action.payload.userId
          ? { ...state.selectedUser, isOnline: action.payload.isOnline }
          : state.selectedUser;
      state.users = state.users.map((user) =>
        user.id === action.payload.userId
          ? { ...user, isOnline: action.payload.isOnline }
          : user
      );
    },
    setUser: (state, action) => {
      state.selectedUser = action.payload.user;
    },
    setNewMessage: (state, action) => {
      if (state.activeChat) {
        action.payload.message.user.id === state.selectedUser?.id &&
        action.payload.message.roomId === state.activeChat.roomId
          ? (state.activeChat.messages = [
              ...state.activeChat.messages,
              action.payload.message,
            ])
          : state.activeChat.messages;
      }
    },
    setMessagesRead: (state, action) => {
      if (state.activeChat) {
        state.activeChat.messages = state.activeChat.messages.map((message) => {
          if (action.payload.messagesIds.includes(message.id)) {
            return { ...message, isRead: true };
          }
          return message;
        });
      }
    },
  },
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

    builder.addCase(getChatByUsersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChatByUsersThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.activeChat = payload.room;
    });
    builder.addCase(getChatByUsersThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.activeChat = null;
    });

    builder.addCase(getChatByRoomIdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChatByRoomIdThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.activeChat = payload.room;
    });
    builder.addCase(getChatByRoomIdThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.activeChat = null;
    });

    builder.addCase(createChatWithUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createChatWithUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.activeChat = payload.room;
    });
    builder.addCase(createChatWithUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(sendMessageThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (state.activeChat) {
        state.activeChat.messages = [...state.activeChat.messages, payload];
      }
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getActiveChatsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getActiveChatsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.chats = payload.rooms;
    });
    builder.addCase(getActiveChatsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(onReadMessagesThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(onReadMessagesThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(onReadMessagesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setStatus, setUser, setNewMessage, setMessagesRead } =
  chatsSlice.actions;
export default chatsSlice.reducer;
