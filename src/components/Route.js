import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { Route as WouterRoute, useLocation } from "wouter";
import { isExpired } from "react-jwt";

import UserDataState from "../atoms/user";
import { Routes } from "../constants/routes";

const Route = ({
  layout: Layout,
  isPrivateRoute: isPrivateRoute,
  ...props
}) => {
  const [, setLocation] = useLocation();
  const [userDataAtoms] = useRecoilState(UserDataState);

  useEffect(() => {
    const isTokenExpired = isExpired(userDataAtoms.jwt);

    if (isTokenExpired && isPrivateRoute) {
      setLocation(Routes.SING_IN);
    }
  });

  return (
    <Layout>
      <WouterRoute {...props} />
    </Layout>
  );
};

Route.propTypes = {
  layout: PropTypes.object.isRequired,
  isPrivateRoute: PropTypes.bool,
};

export default React.memo(Route);
