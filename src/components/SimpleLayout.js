import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import DarkModeSwitcher from "./dark-mode-switcher";
import { Flex } from "./flex";
import { Divider } from "./divider";
import MenuTabs from "./menu-tabs";

const SimpleLayout = ({ children }) => {
  return (
    <>
      {children.props.needMenu ? (
        <Flex direction="column" width={1} height={1}>
          <Flex
            height={1}
            width={1}
            overflowY="auto"
            overflowX="hidden"
            position="relative"
          >
            <DarkModeSwitcher />
            {children}
          </Flex>
          <Divider />
          <s.MenuBar
            height={1}
            flex={1}
            width={1}
            justifyContent="space-around"
          >
            <MenuTabs />
          </s.MenuBar>
        </Flex>
      ) : (
        <>
          <DarkModeSwitcher />
          <s.Container>{children}</s.Container>
        </>
      )}
    </>
  );
};

const s = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,
  MenuBar: styled(Flex)`
    position: sticky;
    top: 0;
  `,
};

SimpleLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(SimpleLayout);
