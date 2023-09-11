import React from "react";
import { useAuth } from "../../../../hooks";
import { Box } from "@mui/material";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        whiteSpace: "pre-wrap",
      }}
    >
      <Box>Hello, </Box>
      <Box fontWeight="500">{currentUser.name}!</Box>
    </Box>
  );
};

export default Header;
