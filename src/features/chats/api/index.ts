import api from "../../../api";
import {
  CreateRoomRequest,
  Message,
  OneUserResponse,
  RoomResponse,
  UsersResponse,
  RoomsResponse,
} from "../types";

export const getUsersAPI = async () => {
  return await api.get<UsersResponse>(`/users`);
};

export const getOneUserAPI = async (id: number) => {
  return await api.get<OneUserResponse>(`/users/${id}`);
};

export const getChatWithUserAPI = async (userId: number) => {
  return await api.get<RoomResponse>(`/rooms/user/${userId}`);
};

export const getChatByRoomIdAPI = async (roomId: string) => {
  return await api.get<RoomResponse>(`/rooms/active-room/${roomId}`);
};

export const createChatWithUserAPI = async (body: CreateRoomRequest) => {
  return await api.post<RoomResponse>(`/rooms`, body);
};

export const sendMessageAPI = async (body: Message) => {
  return await api.patch<RoomResponse>(`/rooms/send-message`, body);
};

export const getActiveChatsAPI = async () => {
  return await api.get<RoomsResponse>(`/rooms/active-user-room`);
};
