import { memo } from "react";
import PropTypes from "prop-types";

import { Flex } from "./flex";
import { Divider } from "./divider";

import DarkModeSwitcher from "./dark-mode-switcher";
import MenuTabs from "./menu-tabs";

const MenuLayout = ({ children }) => {
  return (
    <>
      <DarkModeSwitcher />
      <Flex direction="column" width={1} height={1}>
        <Flex height={1} width={1} overflow="hidden">
          {children}
        </Flex>
        <Divider />
        <Flex height={1} flex={1} width={1} justifyContent="space-around">
          <MenuTabs />
        </Flex>
      </Flex>
    </>
  );
};

MenuLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(MenuLayout);
