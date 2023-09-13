import React from "react";
import { Box, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/constants";

const Header = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "50px",
        right: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link to={ROUTES.home}>
        <Typography
          sx={{
            cursor: "pointer",
            padding: "10px",
            fontSize: "24px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <KeyboardBackspaceIcon />
          Back
        </Typography>
      </Link>
    </Box>
  );
};

export default Header;
