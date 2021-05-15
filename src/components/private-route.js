import { memo, useEffect } from "react";
import { decodeToken } from "react-jwt";
import Route from "./Route";
import { LocalStorageKeys } from "../constants/local-storage-keys";
import { Routes } from "../constants/routes";
import { useLocation } from "wouter";

const PrivateRoute = (props) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = decodeToken(localStorage.getItem(LocalStorageKeys.JWT_TOKEN));

    if (!token) {
      setLocation(Routes.SING_IN);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(token.email)) {
      setLocation(Routes.SING_IN);
    }
  });

  return <Route {...props} />;
};

export default memo(PrivateRoute);
