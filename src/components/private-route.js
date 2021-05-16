import { memo, useEffect } from "react";
import { isExpired } from "react-jwt";
import { useLocation } from "wouter";

import Route from "./Route";
import { LocalStorageKeys } from "constants/local-storage-keys";
import { Routes } from "constants/routes";

const PrivateRoute = (props) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const tokenExpired = isExpired(
      localStorage.getItem(LocalStorageKeys.JWT_TOKEN)
    );

    if (tokenExpired) {
      setLocation(Routes.SING_IN);
    }
  });

  return <Route {...props} />;
};

export default memo(PrivateRoute);
