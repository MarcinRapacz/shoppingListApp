import React from "react";
import { useSelector } from "react-redux";
import { Route as R } from "react-router-dom";
import Auth from "../features/auth/Auth";
import { IStore } from "../app/store";

export interface RouteInterface {
  children?: React.ReactNode;
  path?: string;
  exact?: boolean;
  secure?: boolean;
  component?: React.FC;
}

export const Route: React.FC<RouteInterface> = ({
  path,
  exact,
  secure,
  component,
  children,
}) => {
  const { auth } = useSelector((state: IStore) => state);
  const { isAuth } = auth;

  return secure && !isAuth ? (
    <Auth mode="login" />
  ) : (
    <R path={path} exact={exact} component={component}>
      {children}
    </R>
  );
};
