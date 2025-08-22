import React from "react";
import { Navigate } from "react-router-dom";
import { CookiesStorage } from "../../shared/utils/cookie-storage";
import { PATH_NAME } from "../../configs";
interface IGuestGuard {
  children?: React.ReactNode;
}

const GuestGuard = ({ children }: IGuestGuard) => {
  const isAuth = CookiesStorage.getAccessToken();

  if (isAuth) return <Navigate to={PATH_NAME.HOME} replace={true} />;

  return <>{children}</>;
};

export default GuestGuard;
