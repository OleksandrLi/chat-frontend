import React, { useEffect } from "react";
import UserInfoPage from "../../../../shared/components/UserInfoPage";
import { useParams } from "react-router";
import { useAuth, useChats } from "../../../../hooks";

const User = () => {
  const { id } = useParams();

  const { currentUser } = useAuth();

  const {
    onGetOneUsers,
    selectedUser,
    activeChat,
    onGetChatByUsers,
    onCreateChat,
  } = useChats();

  const createChat = () => {
    onCreateChat({
      providerId: selectedUser.id,
    });
  };

  useEffect(() => {
    if (id) {
      onGetOneUsers(+id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedUser.id && currentUser.id) {
      onGetChatByUsers(selectedUser.id);
    }
  }, [selectedUser.id, currentUser.id]);

  return (
    <UserInfoPage
      user={selectedUser}
      activeChat={activeChat}
      createChat={createChat}
    />
  );
};

export default User;
