import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../../hooks";

const Profile = () => {
  const { currentUser, onUpdateAvatar } = useAuth();

  const onSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      const form = new FormData();
      form.append("image", file as Blob);
      onUpdateAvatar(form);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Typography
          component="header"
          sx={{
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          Profile
        </Typography>
        <Box
          sx={{
            width: "50px",
            height: "50px",
          }}
        >
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={currentUser.image}
          />
        </Box>
        <Box>
          <label
            htmlFor="avatar"
            style={{
              cursor: "pointer",
              padding: "5px 10px",
              fontSize: "16px",
              textDecoration: "underline",
              color: "#00a9ff",
            }}
          >
            Change avatar
          </label>
          <input
            style={{ display: "none" }}
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            multiple
            onChange={onSelectAvatar}
          />
        </Box>
        <Typography
          sx={{
            fontSize: "26px",
            fontWeight: "500",
          }}
        >
          {currentUser.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          {currentUser.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
