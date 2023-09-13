import React from "react";
import Header from "./Header";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../../hooks";
import { useNavigate } from "react-router";
import ROUTES from "../../../../routes/constants";
import UsersList from "./UsersList";

const Home = () => {
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate(ROUTES.login);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "50px 50px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header />
        <Typography fontSize="24px" fontWeight="600">
          Chats
        </Typography>
        <Typography
          component="span"
          color="#cf2828"
          fontWeight="500"
          padding="10px 5px"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleLogout}
        >
          Logout
        </Typography>
      </Box>

      <UsersList />
    </Box>
  );
};

export default Home;
