import React from "react";
import { Box, Typography } from "@mui/material";
import { useChats } from "../../../../hooks";

export const Header = () => {
  const { selectedUser } = useChats();

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
      {selectedUser?.image ? (
        <Box
          sx={{
            width: "35px",
            height: "35px",
          }}
        >
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={selectedUser.image}
          />
        </Box>
      ) : null}
      <Typography>{selectedUser?.name}</Typography>
      <Typography
        sx={{
          background: selectedUser?.isOnline ? "#228B22" : "#bf2323",
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
