import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../hooks";
import { User } from "../../features/auth/types";
import Header from "./UserInfoHeader";

type UserInfoPageProps = {
  user: User;
  isCurrentAccount?: boolean;
};

const UserInfoPage: React.FC<UserInfoPageProps> = ({
  user,
  isCurrentAccount,
}) => {
  const { onUpdateAvatar } = useAuth();

  const onSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      const form = new FormData();
      form.append("image", file as Blob);
      onUpdateAvatar(form);
    }
  };

  return (
    <>
      <Header />
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
            padding: "20px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.4)",
            border: "1px solid #673AB7",
            borderRadius: "10px",
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
          {user.image ? (
            <Box
              sx={{
                width: "50px",
                height: "50px",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                src={user.image}
              />
            </Box>
          ) : null}
          {isCurrentAccount ? (
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
          ) : null}
          <Typography
            sx={{
              fontSize: "26px",
              fontWeight: "500",
            }}
          >
            {user.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {user.email}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default UserInfoPage;
