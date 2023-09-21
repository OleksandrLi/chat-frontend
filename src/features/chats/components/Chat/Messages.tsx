import React from "react";
import { User } from "../../../auth/types";
import { Message } from "../../types";
import { Box, Typography } from "@mui/material";
import { useChats } from "../../../../hooks";

type MessageProps = {
  user: User;
  messages: Message[];
};

export const Messages: React.FC<MessageProps> = ({ user, messages }) => {
  const { activeChat } = useChats();

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100% - 52px)",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        paddingRight: "10px",
      }}
    >
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activeChat?.messages?.length ? (
          <MessagesList user={user} messages={activeChat.messages} />
        ) : null}
        <MessagesList user={user} messages={messages} />
      </Box>
    </Box>
  );
};

type MessagesListProps = {
  user: User;
  messages: Message[];
};

export const MessagesList: React.FC<MessagesListProps> = ({
  user,
  messages,
}) => {
  return (
    <>
      {messages?.map((message) => {
        return (
          <Box
            key={message.messageId}
            sx={{
              fontSize: "14px",
              marginLeft: message.user.id === user.id ? "auto" : "initial",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography component="span" sx={{ fontWeight: "600" }}>
                {message.user.name}
              </Typography>
              <Typography
                component="span"
                sx={{ fontStyle: "italic", fontSize: "12px" }}
              >
                {message.timeSent}
              </Typography>
            </Box>
            <div>
              <Typography
                component="p"
                sx={{
                  fontSize: "16px",
                  textAlign: message.user.id === user.id ? "right" : "left",
                }}
              >
                {message.message}
              </Typography>
            </div>
          </Box>
        );
      })}
    </>
  );
};
