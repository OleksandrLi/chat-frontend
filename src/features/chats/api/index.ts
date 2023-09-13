import api from "../../../api";
import { OneUserResponse, UsersResponse } from "../types";

export const getUsersAPI = async () => {
  return await api.get<UsersResponse>(`/users`);
};

export const getOneUserAPI = async (id: number) => {
  return await api.get<OneUserResponse>(`/users/${id}`);
};
