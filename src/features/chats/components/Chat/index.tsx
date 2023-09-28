import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";

import { useAuth, useChats } from "../../../../hooks";
import { useNavigate, useParams } from "react-router";
import { Messages } from "./Messages";
import { MessageForm } from "./MessageForm";
import { Message } from "../../types";
import ROUTES from "../../../../routes/constants";
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
    onReadMessages,
    onSetMessagesRead,
  } = useChats();

  useEffect(() => {
    if (chatId) {
      onReadMessages(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (websocket) {
      websocket.on("chat", (data: Message) => {
        onSetNewMessage({ message: data });
      });
      websocket.on(
        "read_messages",
        (data: { roomId: string; messagesIds: number[] }) => {
          if (chatId === data.roomId) {
            onSetMessagesRead({ messagesIds: data.messagesIds });
          }
        }
      );
    }

    return () => {
      if (websocket) {
        websocket.off("chat");
        websocket.off("read_messages");
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
        {currentUser ? <Messages /> : null}
        <MessageForm sendMessage={sendMessage} />
      </Box>
    </Box>
  );
}

export default Chat;
