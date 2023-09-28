import React, { useEffect, useRef } from "react";
import { User } from "../../../auth/types";
import { Message } from "../../types";
import { Box, Typography } from "@mui/material";
import { useAuth, useChats } from "../../../../hooks";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import dayjs from "dayjs";
import { useParams } from "react-router";

export const Messages = () => {
  const { chatId } = useParams();

  const { currentUser } = useAuth();
  const { activeChat, onReadMessages } = useChats();

  const bottomEl = useRef(null) as any;

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    if (bottomEl && activeChat?.messages?.length) {
      scrollToBottom();
    }
  }, [bottomEl, activeChat]);

  useEffect(() => {
    if (chatId && activeChat) {
      if (
        !activeChat.messages[activeChat.messages.length - 1].isRead &&
        activeChat.messages[activeChat.messages.length - 1].user.id !==
          currentUser.id
      ) {
        onReadMessages(chatId);
      }
    }
  }, [chatId, activeChat?.messages.length]);

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
        {activeChat ? (
          <MessagesList user={currentUser} messages={activeChat.messages} />
        ) : null}
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
            key={message.id}
            sx={{
              fontSize: "14px",
              marginLeft: message.user.id === user.id ? "auto" : "initial",
              marginRight: message.user.id !== user.id ? "auto" : "initial",
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
                  width: "fit-content",
                  maxWidth: "100%",
                  textWrap: "wrap",
                  overflowWrap: "break-word",
                }}
              >
                {message.message}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",

                svg: {
                  width: "12px",
                  height: "12px",
                },
              }}
            >
              {message.isRead ? <DoneAllIcon /> : <CheckIcon />}
              <Typography
                component="span"
                sx={{
                  fontStyle: "italic",
                  fontSize: "11px",
                }}
              >
                {dayjs(message.timeSent).format("YYYY-MM-DD HH:mm:ss")}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
};
