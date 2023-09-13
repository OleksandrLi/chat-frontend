import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../store";
import { getOneUserThunk, getUsersThunk } from "../redux/thunk";

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

  return {
    ...state,
    onGetUsers,
    onGetOneUsers,
  };
}
