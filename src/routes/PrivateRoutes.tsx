import React from "react";
import { Navigate, Outlet } from "react-router";

import { useAuth } from "../hooks";
import ROUTES from "./constants";
import { getRefreshWithLocalStorage } from "../utils/localStorage";

const PrivateRoutes = () => {
  const { isAuth } = useAuth();
  const refresh = getRefreshWithLocalStorage();

  return isAuth || refresh ? <Outlet /> : <Navigate to={ROUTES.login} />;
};

export default PrivateRoutes;
