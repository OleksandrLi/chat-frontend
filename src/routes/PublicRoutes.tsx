import React from "react";
import { Navigate, Outlet } from "react-router";

import { useAuth } from "../hooks";
import ROUTES from "./constants";

const PublicRoutes = () => {
  const { isAuth } = useAuth();

  return !isAuth ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={ROUTES.home} />
  );
};
export default PublicRoutes;
