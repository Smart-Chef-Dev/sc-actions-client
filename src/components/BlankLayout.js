import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

const BlankLayout = ({ children }) => {
  return <s.Container>{children}</s.Container>;
};

const s = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,
};

BlankLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(BlankLayout);
