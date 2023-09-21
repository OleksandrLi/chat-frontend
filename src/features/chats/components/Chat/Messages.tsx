import React, { useEffect, useRef } from "react";
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

  const bottomEl = useRef(null) as any;

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (bottomEl && activeChat?.messages?.length) {
      scrollToBottom();
    }
  }, [bottomEl, activeChat]);

  return (
    <Box
      className="scroll-div"
      sx={{
        width: "100%",
        height: "calc(100% - 52px)",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        paddingRight: "10px",
        flex: "1",
        marginBottom: "52px",
      }}
    >
      <Box
        ref={bottomEl}
        sx={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              maxWidth: "90%",
              padding: "0 5px 0 5px",
            }}
          >
            <Box
              sx={{
                background: message.user.id === user.id ? "#ffecec" : "#e2f4fd",
                padding: "5px 10px",
                borderRadius: "7px",
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontSize: "16px",
                  // textAlign: message.user.id === user.id ? "right" : "left",
                  width: "fit-content",
                  maxWidth: "100%",
                  textWrap: "wrap",
                  overflowWrap: "break-word",
                }}
              >
                {message.message}
              </Typography>
            </Box>
            <Typography
              component="span"
              sx={{
                fontStyle: "italic",
                fontSize: "11px",
                // textAlign: message.user.id === user.id ? "right" : "left",
              }}
            >
              {message.timeSent}
            </Typography>
          </Box>
        );
      })}
    </>
  );
};
