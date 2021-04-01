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
  layout: PropTypes.object.isRequired,
};

export default React.memo(Route);
