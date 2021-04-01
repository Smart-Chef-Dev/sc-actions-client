import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import DarkModeSwitcher from "./dark-mode-switcher";

const SimpleLayout = ({ children }) => {
  return (
    <>
      <DarkModeSwitcher />
      <s.Container>{children}</s.Container>
    </>
  );
};

const s = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,
};

SimpleLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(SimpleLayout);
