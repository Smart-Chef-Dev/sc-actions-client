import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import DarkModeSwitcher from "./dark-mode-switcher";
import Logo from "./logo";

const MainLayout = ({ children }) => {
  return (
    <>
      <DarkModeSwitcher />
      <Logo />
      <s.PageContainer>{children}</s.PageContainer>
    </>
  );
};

const s = {
  PageContainer: styled.div`
    height: 70vh;
    padding-top: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;

    overflow-y: scroll;
  `,
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(MainLayout);
