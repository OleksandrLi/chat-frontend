import React from "react";
import { useAuth } from "../../../../hooks";
import UserInfoPage from "../../../../shared/components/UserInfoPage";

const Profile = () => {
  const { currentUser } = useAuth();

  return <UserInfoPage user={currentUser} isCurrentAccount />;
};

export default Profile;
