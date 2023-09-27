import React, { useEffect } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import ROUTES from "../../../../routes/constants";
import { User } from "../../../auth/types";
import { useAuth, useChats } from "../../../../hooks";

const CreatedChatsList = () => {
  const { currentUser } = useAuth();
  const { onGetActiveChats, chats, onSetUser } = useChats();

  const navigate = useNavigate();

  const selectChat = (roomsId: string, user: User) => {
    onSetUser({ user: user });
    navigate(ROUTES.dynamic.chats(`${roomsId}`));
  };

  useEffect(() => {
    onGetActiveChats();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="p" fontWeight="600">
        Created Chats
      </Typography>
      <List>
        {chats.length
          ? chats.map((chat) => (
              <ListItem
                key={chat.roomId}
                sx={{
                  gap: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgb(161 161 161 / 10%)",
                  },
                }}
                onClick={() => {
                  const user =
                    chat.provider.id === currentUser.id
                      ? chat.client
                      : chat.provider;
                  selectChat(chat.roomId, user);
                }}
              >
                <Typography>{chat.provider.name}</Typography>
                {chat.provider.image ? (
                  <img
                    src={chat.provider.image}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                ) : null}
              </ListItem>
            ))
          : null}
      </List>
    </Box>
  );
};

export default CreatedChatsList;
