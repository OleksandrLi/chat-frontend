import React, { useEffect } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import useChats from "../../hooks/useChats";
import { useNavigate } from "react-router";
import ROUTES from "../../../../routes/constants";

const UsersList = () => {
  const { onGetUsers, users } = useChats();

  const navigate = useNavigate();

  const selectUser = (id: number) => {
    navigate(ROUTES.dynamic.users(`${id}`));
  };

  useEffect(() => {
    onGetUsers();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography component="p" fontWeight="600">
        Users
      </Typography>
      <List>
        {users.length
          ? users.map((user) => (
              <ListItem
                key={user.id}
                sx={{
                  gap: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgb(161 161 161 / 10%)",
                  },
                }}
                onClick={() => {
                  selectUser(user.id);
                }}
              >
                <Typography>{user.name}</Typography>
                {user.image ? (
                  <img
                    alt="avatar"
                    src={user.image}
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

export default UsersList;
