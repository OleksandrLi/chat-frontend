import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";

import { useAuth, useChats } from "../../../../hooks";
import { useNavigate, useParams } from "react-router";
import { Messages } from "./Messages";
import { MessageForm } from "./MessageForm";
import { Message } from "../../types";
import ROUTES from "../../../../routes/constants";
import { User } from "../../../auth/types";
import { Header } from "./Header";
import { WebsocketContext } from "../../../../shared/context/WebsocketContext";

function Chat() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const websocket = useContext(WebsocketContext);

  const { currentUser } = useAuth();
  const {
    onSendMessage,
    onGetChatByRoomId,
    activeChat,
    onSetUser,
    onSetNewMessage,
  } = useChats();

  const [messages, setMessages] = useState<Message[]>([]);

  // useEffect(() => {
  //   if (currentUser.id) {
  //     socket.on("connect", () => {
  //       socket.emit("join_room", {
  //         roomId: chatId as string,
  //         userId: currentUser.id,
  //         socketId: socket.id,
  //       });
  //       setIsConnected(true);
  //     });
  //
  //     socket.on("disconnect", () => {
  //       setIsConnected(false);
  //     });
  //
  //     socket.on("chat", (e) => {
  //       setMessages((messages) => [...messages, e]);
  //     });
  //
  //     socket.on("join_room", (e) => {
  //       setUsers(e.users);
  //       setMessages(e.messages);
  //     });
  //
  //     socket.on("leave_room", (e) => {
  //       setUsers(e);
  //     });
  //
  //     socket.connect();
  //   }
  //
  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("chat");
  //     socket.off("join_room");
  //
  //     socket.emit("leave_room", {
  //       roomId: chatId as string,
  //       userId: currentUser.id,
  //       socketId: socket.id,
  //     });
  //
  //     socket.off("leave_room");
  //     socket.disconnect();
  //   };
  // }, [currentUser.id, chatId]);

  useEffect(() => {
    if (websocket) {
      websocket?.on("chat", (data: Message) => {
        onSetNewMessage({ message: data });
      });
    }

    return () => {
      if (websocket) {
        websocket.off("chat");
      }
    };
  }, [websocket]);

  const sendMessage = (message: string) => {
    if (chatId) {
      const getMessageData = () => {
        const messageData = {
          timeSent: new Date(Date.now()),
          message,
          roomId: chatId,
        };
        return messageData;
      };

      onSendMessage(getMessageData());
    }
  };

  useEffect(() => {
    if (chatId) {
      onGetChatByRoomId(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (activeChat && currentUser) {
      const user =
        activeChat.provider.id === currentUser.id
          ? activeChat.client
          : activeChat.provider;
      onSetUser({ user: user });
    }
  }, [activeChat, currentUser]);

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
      <Header />
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
        {currentUser ? <Messages messages={messages} /> : null}
        <MessageForm sendMessage={sendMessage} />
      </Box>
    </Box>
  );
}

export default Chat;
