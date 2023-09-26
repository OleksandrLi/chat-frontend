import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  createChatWithUserThunk,
  getChatByRoomIdThunk,
  getChatByUsersThunk,
  getOneUserThunk,
  getUsersThunk,
  sendMessageThunk,
} from "../redux/thunk";
import { CreateRoomRequest, Message } from "../types";
import { useNavigate } from "react-router";
import ROUTES from "../../../routes/constants";
import { setStatus } from "../redux/slice";

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
    (user1Id: number, user2Id: number) => {
      dispatch(getChatByUsersThunk([user1Id, user2Id]));
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
    (body: Message) => {
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

  return {
    ...state,
    onGetUsers,
    onGetOneUsers,
    onGetChatByUsers,
    onGetChatByRoomId,
    onCreateChat,
    onSendMessage,
    onSetStatus,
  };
}
