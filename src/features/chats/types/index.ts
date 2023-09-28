import { User } from "../../auth/types";

interface UsersResponse {
  users: User[];
}

interface OneUserResponse {
  user: User;
}

interface IRoom {
  id: number;
  roomId: string;
  messages: Message[];
  provider: User;
  client: User;
}

interface RoomResponse {
  room: IRoom;
}

interface RoomsResponse {
  rooms: IRoom[];
}

interface CreateRoomRequest {
  providerId: number;
}

interface Message {
  id: number | string;
  user: User;
  timeSent: Date;
  message: string;
  roomId: string;
  isRead?: boolean;
}

interface SendMessageRequest {
  timeSent: Date;
  message: string;
  roomId: string;
}

export type {
  UsersResponse,
  OneUserResponse,
  IRoom,
  Message,
  RoomResponse,
  CreateRoomRequest,
  RoomsResponse,
  SendMessageRequest,
};
