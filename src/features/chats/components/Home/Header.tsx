import React from "react";
import { useAuth } from "../../../../hooks";
import { Box } from "@mui/material";
import ROUTES from "../../../../routes/constants";
import { Link } from "react-router-dom";

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
      <Link to={ROUTES.profile} style={{ display: "flex", padding: "10px" }}>
        <Box>Hello, </Box>
        <Box fontWeight="500">{currentUser.name}!</Box>
      </Link>
    </Box>
  );
};

export default Header;
