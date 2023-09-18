import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Box } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";

import { useAuth } from "../../../../hooks";
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
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join_room", {
        roomId: chatId as string,
        user: currentUser,
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

    socket.connect();
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat");
    };
  }, []);

  const sendMessage = (message: string) => {
    socket.emit("chat", {
      user: {
        id: currentUser.id,
        name: currentUser.name,
        socketId: socket.id,
      },
      timeSent: new Date(Date.now()).toLocaleString("en-US"),
      message,
      roomId: chatId,
    } as any);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
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
          maxHeight: "95vh",
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
