import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import DarkModeSwitcher from "./dark-mode-switcher";
import Logo from "./logo";

import { Flex } from "./flex";
import { theme } from "theme";

const MainLayout = ({ children }) => {
  return (
    <>
      <DarkModeSwitcher />
      <Logo />
      <s.PageContainer
        pt={theme.spacing(1)}
        justifyContent="center"
        alignItems="center"
        direction="column"
        boxSizing="border-box"
        overflowY="auto"
      >
        {children}
      </s.PageContainer>
    </>
  );
};

const s = {
  PageContainer: styled(Flex)`
    height: 70vh;
  `,
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(MainLayout);
