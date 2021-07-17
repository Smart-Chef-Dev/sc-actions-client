import { memo, useEffect } from "react";
import { isExpired } from "react-jwt";
import { useLocation } from "wouter";
import { useRecoilState } from "recoil";

import Route from "./Route";
import { Routes } from "constants/routes";

import UserDataState from "atoms/user";

const PrivateRoute = (props) => {
  const [, setLocation] = useLocation();
  const [userDataAtoms] = useRecoilState(UserDataState);

  useEffect(() => {
    const isTokenExpired = isExpired(userDataAtoms.jwt);

    if (isTokenExpired) {
      setLocation(Routes.SING_IN);
    }
  });

  return <Route {...props} />;
};

export default memo(PrivateRoute);
