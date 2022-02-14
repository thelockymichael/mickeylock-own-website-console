import React from "react";
import { RouteProps, Redirect, Route } from "react-router-dom";

import paths from "../config/routeUrls";
import { getCurrentUser } from "../services/auth.service";

interface IAppRoutes {
  path: RouteProps["path"];
  component: React.ElementType;
  exact: boolean;
  isPrivate: boolean;
}

const AppRoute: React.FC<IAppRoutes> = ({
  component: Component,
  path,
  isPrivate,
  exact,
  ...rest
}) => {
  const currentUser = getCurrentUser();

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (isPrivate && !currentUser?.authToken) {
          return <Redirect to={{ pathname: paths.loginPath }} />;
        } else if (currentUser?.authToken && path === paths.loginPath) {
          return <Redirect to={{ pathname: paths.dashboardPath }} />;
        } else {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default AppRoute;
