import React, { useEffect, useState } from "react";
import { User } from "../../../auth/types";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../../hooks";

type HeaderProps = {
  users: User[];
};

export const Header: React.FC<HeaderProps> = ({ users }) => {
  const { currentUser } = useAuth();

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const selectedUser = users.filter((user) => user.id !== currentUser.id)[0];
    setUser(selectedUser);
  }, [currentUser, users]);

  return (
    <Box
      sx={{
        position: "relative",
        margin: "10px 0 5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {user?.image ? (
        <Box
          sx={{
            width: "35px",
            height: "35px",
          }}
        >
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={user.image}
          />
        </Box>
      ) : null}
      <Typography>{user?.name}</Typography>
      <Typography
        sx={{
          background: user?.isActive ? "#228B22" : "#bf2323",
          color: "transparent",
          width: "9px",
          height: "9px",
          borderRadius: "100px",
          zIndex: "5",
        }}
      >
        text
      </Typography>
    </Box>
  );
};
