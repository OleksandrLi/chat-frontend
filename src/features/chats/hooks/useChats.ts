import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  createChatWithUserThunk,
  getChatByUsersThunk,
  getOneUserThunk,
  getUsersThunk,
} from "../redux/thunk";
import { CreateRoomRequest } from "../types";

export default function useChats() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.chats);

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

  const onCreateChat = useCallback(
    (body: CreateRoomRequest) => {
      dispatch(createChatWithUserThunk(body));
    },
    [dispatch]
  );

  return {
    ...state,
    onGetUsers,
    onGetOneUsers,
    onGetChatByUsers,
    onCreateChat,
  };
}
