import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  createChatWithUserThunk,
  getActiveChatsThunk,
  getChatByRoomIdThunk,
  getChatByUsersThunk,
  getOneUserThunk,
  getUsersThunk,
  onReadMessagesThunk,
  sendMessageThunk,
} from "../redux/thunk";
import { CreateRoomRequest, Message, SendMessageRequest } from "../types";
import { useNavigate } from "react-router";
import ROUTES from "../../../routes/constants";
import {
  setStatus,
  setUser,
  setNewMessage,
  setMessagesRead,
} from "../redux/slice";
import { User } from "../../auth/types";

export default function useChats() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.chats);

  const navigate = useNavigate();

  const onGetUsers = useCallback(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  const onGetOneUsers = useCallback(
    (id: number) => {
      dispatch(getOneUserThunk(id));
    },
    [dispatch]
  );

  const onGetChatByUsers = useCallback(
    (user1Id: number) => {
      dispatch(getChatByUsersThunk(user1Id));
    },
    [dispatch]
  );

  const onGetChatByRoomId = useCallback(
    (roomId: string) => {
      dispatch(getChatByRoomIdThunk(roomId));
    },
    [dispatch]
  );

  const onCreateChat = useCallback(
    (body: CreateRoomRequest) => {
      dispatch(createChatWithUserThunk(body)).then((resp: any) => {
        if (resp.payload.room.roomId) {
          navigate(ROUTES.dynamic.chats(resp.payload.room.roomId));
        }
      });
    },
    [dispatch]
  );

  const onSendMessage = useCallback(
    (body: SendMessageRequest) => {
      dispatch(sendMessageThunk(body));
    },
    [dispatch]
  );

  const onSetStatus = useCallback(
    (payload: { userId: number; isOnline: boolean }) => {
      dispatch(setStatus(payload));
    },
    [dispatch]
  );

  const onGetActiveChats = useCallback(() => {
    dispatch(getActiveChatsThunk());
  }, [dispatch]);

  const onSetUser = useCallback(
    (payload: { user: User }) => {
      dispatch(setUser(payload));
    },
    [dispatch]
  );

  const onSetNewMessage = useCallback(
    (payload: { message: Message }) => {
      dispatch(setNewMessage(payload));
    },
    [dispatch]
  );

  const onReadMessages = useCallback(
    (roomId: string) => {
      dispatch(onReadMessagesThunk(roomId));
    },
    [dispatch]
  );

  const onSetMessagesRead = useCallback(
    (payload: { messagesIds: number[] }) => {
      dispatch(setMessagesRead(payload));
    },
    [dispatch]
  );

  return {
    ...state,
    onGetUsers,
    onGetOneUsers,
    onGetChatByUsers,
    onGetChatByRoomId,
    onCreateChat,
    onSendMessage,
    onSetStatus,
    onGetActiveChats,
    onSetUser,
    onSetNewMessage,
    onReadMessages,
    onSetMessagesRead,
  };
}
