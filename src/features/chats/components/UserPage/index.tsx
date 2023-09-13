import React, { useEffect } from "react";
import UserInfoPage from "../../../../shared/components/UserInfoPage";
import useChats from "../../hooks/useAuth";
import { useParams } from "react-router";

const User = () => {
  const { id } = useParams();

  const { onGetOneUsers, selectedUser } = useChats();

  useEffect(() => {
    if (id) {
      onGetOneUsers(+id);
    }
  }, [id]);

  return <UserInfoPage user={selectedUser} />;
};

export default User;
