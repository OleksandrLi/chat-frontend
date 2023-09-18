import api from "../../../api";
import {
  CreateRoomRequest,
  OneUserResponse,
  RoomResponse,
  UsersResponse,
} from "../types";

export const getUsersAPI = async () => {
  return await api.get<UsersResponse>(`/users`);
};

export const getOneUserAPI = async (id: number) => {
  return await api.get<OneUserResponse>(`/users/${id}`);
};

export const getChatWithUserAPI = async (user1Id: number, user2Id: number) => {
  return await api.get<RoomResponse>(`/rooms/${user1Id}/${user2Id}`);
};

export const createChatWithUserAPI = async (body: CreateRoomRequest) => {
  return await api.post<RoomResponse>(`/rooms`, body);
};
