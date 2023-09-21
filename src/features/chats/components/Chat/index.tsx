import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Box } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";

import { useAuth, useChats } from "../../../../hooks";
import { useNavigate, useParams } from "react-router";
import { Messages } from "./Messages";
import { MessageForm } from "./MessageForm";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from "../../types";
import config from "../../../../constants/config";
import ROUTES from "../../../../routes/constants";
import { User } from "../../../auth/types";
import { Header } from "./Header";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  config.API_URL,
  {
    autoConnect: false,
  }
);

function Chat() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { onSendMessage, onGetChatByRoomId, activeChat } = useChats();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>(activeChat?.users || []);

  useEffect(() => {
    if (currentUser.id) {
      socket.on("connect", () => {
        socket.emit("join_room", {
          roomId: chatId as string,
          userId: currentUser.id,
          socketId: socket.id,
        });
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      socket.on("chat", (e) => {
        setMessages((messages) => [e, ...messages]);
      });

      socket.on("join_room", (e) => {
        setUsers(e);
      });

      socket.on("leave_room", (e) => {
        setUsers(e);
      });

      socket.connect();
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat");
      socket.off("join_room");

      socket.emit("leave_room", {
        roomId: chatId as string,
        userId: currentUser.id,
        socketId: socket.id,
      });

      socket.off("leave_room");
      socket.disconnect();
    };
  }, [currentUser.id, chatId]);

  const sendMessage = (message: string) => {
    const getMessageData = (isSocket?: boolean) => {
      const messageData = {
        user: {
          id: currentUser.id,
          name: currentUser.name,
        } as any,
        timeSent: new Date(Date.now()).toLocaleString("en-US"),
        message,
        roomId: chatId,
      };
      if (isSocket) {
        messageData.user.socketId = socket.id;
      }
      return messageData;
    };

    socket.emit("chat", getMessageData(true) as any);
    onSendMessage(getMessageData() as Message);
  };

  useEffect(() => {
    if (!activeChat && chatId) {
      onGetChatByRoomId(chatId);
    }
  }, [activeChat, chatId]);

  return (
    <Box
      sx={{
        margin: "auto",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header users={users} />
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          maxWidth: "800px",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid grey",
          padding: "10px",
          boxSizing: "border-box",
          position: "relative",
          maxHeight: "85vh",
          flex: "1",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "-40px",
            top: "45%",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(ROUTES.home);
          }}
        >
          <FirstPageIcon fontSize="large" />
        </Box>
        {currentUser ? (
          <Messages user={currentUser} messages={messages} />
        ) : null}
        <MessageForm sendMessage={sendMessage} />
      </Box>
    </Box>
  );
}

export default Chat;
