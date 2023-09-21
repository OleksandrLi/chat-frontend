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
  usersIds: number[];
  messages: Message[];
  users: User[];
}

interface RoomResponse {
  room: IRoom;
}

interface CreateRoomRequest {
  usersIds: number[];
  users: User[];
}

interface Message {
  user: User;
  timeSent: string;
  message: string;
  roomId: string;
  messageId: string;
}

interface ServerToClientEvents {
  chat: (e: Message) => void;
  join_room: (e: User[]) => void;
  leave_room: (e: User[]) => void;
}

interface ClientToServerEvents {
  chat: (e: Message) => void;
  join_room: (e: { roomId: string; userId: number; socketId: string }) => void;
  leave_room: (e: { roomId: string; userId: number; socketId: string }) => void;
}

export type {
  UsersResponse,
  OneUserResponse,
  IRoom,
  Message,
  ServerToClientEvents,
  ClientToServerEvents,
  RoomResponse,
  CreateRoomRequest,
};
