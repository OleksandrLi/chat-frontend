import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Boundary } from "../shared/errors";
import ROUTES from "./constants";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import * as Pages from "../pages";
import { useAuth } from "../hooks";
import { getAccessWithLocalStorage } from "../utils/localStorage";

const AppRoutes = () => {
  const { isAuth, onGetProfile } = useAuth();

  const access = getAccessWithLocalStorage();

  useEffect(() => {
    if (!isAuth && access) {
      onGetProfile();
    }
  }, [isAuth, access, onGetProfile]);

  return (
    <Boundary>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={ROUTES.home} element={<Pages.Home />} />
          <Route path={ROUTES.profile} element={<Pages.Profile />} />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path={ROUTES.signup} element={<Pages.SingUp />} />
          <Route path={ROUTES.login} element={<Pages.Login />} />
        </Route>
      </Routes>
    </Boundary>
  );
};

export default AppRoutes;
