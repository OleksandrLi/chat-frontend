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
        padding: "50px 50px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
