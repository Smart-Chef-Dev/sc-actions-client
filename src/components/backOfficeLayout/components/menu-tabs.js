import { Fragment, memo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuTab from "./menu-tab";

import { BackOfficeMenuTabs } from "constants/backOfficeMenuTabs";
import { theme } from "theme";
import SmallLogo from "assets/icons/logo/small_logo.svg";
import LogOutIcon from "assets/icons/back-office/log_out_icon.svg";

const MenuTabs = ({ selectedTab, onSelectedTab, onLocation, location }) => {
  return (
    <s.MenuTabs direction="column" alignItems="center" width={1} height={1}>
      <Flex height={1} flex={1} m={theme.spacing(1)} mb={theme.spacing(3)}>
        <SmallLogo />
      </Flex>
      <Flex
        width={1}
        height={1}
        direction="column"
        justifyContent="space-between"
      >
        <Flex width={1} direction="column">
          {BackOfficeMenuTabs.map((menuTab, i) => (
            <Fragment key={i}>
              <MenuTab
                menuTab={menuTab}
                selectedTab={selectedTab}
                onSelectedTab={onSelectedTab}
                onLocation={onLocation}
                location={location}
              />
            </Fragment>
          ))}
        </Flex>
        <s.MenuTab width={1} py={theme.spacing(1)} justifyContent="center">
          <LogOutIcon />
        </s.MenuTab>
      </Flex>
    </s.MenuTabs>
  );
};

const s = {
  MenuTab: styled(Text)`
    background: var(--light-grey);
    border-left: 4px solid var(--light-grey);
  `,

  MenuTabs: styled(Flex)`
    box-shadow: 3px 0 7px rgba(0, 0, 0, 0.03);
  `,
};

MenuTabs.propTypes = {
  selectedTab: PropTypes.object,
  onSelectedTab: PropTypes.func,
  onLocation: PropTypes.func,
  location: PropTypes.string,
};

export default memo(MenuTabs);
