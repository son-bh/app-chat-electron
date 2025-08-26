import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CookiesStorage } from "../../shared/utils/cookie-storage";
import { PATH_NAME } from "../../configs";

interface IAuthGuard {
  children?: React.ReactNode;
}

const AuthGuard = ({ children }: IAuthGuard) => {
  const isAuth = CookiesStorage.getAccessToken();
  const location = useLocation();

  if (!isAuth)
    return (
      <Navigate
        to={PATH_NAME.LOGIN}
        replace={true}
        state={{ from: location }}
      />
    );

  return <>{children}</>;
};

export default AuthGuard;
