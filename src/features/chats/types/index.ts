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
  users: number[];
}

interface RoomResponse {
  room: IRoom | null;
}

interface CreateRoomRequest {
  users: number[];
}

interface Message {
  user: User;
  timeSent: string;
  message: string;
  roomId: string;
}

interface ServerToClientEvents {
  chat: (e: Message) => void;
}

interface ClientToServerEvents {
  chat: (e: Message) => void;
  join_room: (e: { roomId: string; user: User; socketId: string }) => void;
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
