import React from "react";
import PropTypes from "prop-types";
import { Route as WouterRoute } from "wouter";

const Route = ({ layout: Layout, ...props }) => {
  return (
    <Layout>
      <WouterRoute {...props} />
    </Layout>
  );
};

Route.propTypes = {
  layout: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default React.memo(Route);
