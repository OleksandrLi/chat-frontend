import { User } from "../../auth/types";

interface UsersResponse {
  users: User[];
}

interface OneUserResponse {
  user: User;
}

export type { UsersResponse, OneUserResponse };
