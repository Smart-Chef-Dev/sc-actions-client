import { Fragment, memo, useCallback, useState } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuTab from "./menu-tab";

import { BackOfficeMenuTabs } from "constants/backOfficeMenuTabs";
import { theme } from "theme";
import SmallLogo from "assets/icons/logo/small_logo.svg";
import MiddleLogo from "assets/icons/logo/middle_logo.svg";
import ExitButton from "./exit-button";

const MenuTabs = ({
  selectedTab,
  onSelectedTab,
  onChangeLocation,
  location,
  translations,
}) => {
  const [isTabMenuExpanded, setIsTabMenuExpanded] = useState(false);

  const expandTabMenu = useCallback(() => setIsTabMenuExpanded(true), []);
  const collapseTabMenu = useCallback(() => setIsTabMenuExpanded(false), []);

  return (
    <s.MenuTabs
      direction="column"
      alignItems="center"
      width={1}
      height={1}
      onMouseEnter={expandTabMenu}
      onMouseLeave={collapseTabMenu}
    >
      <Flex height={1} flex={1} m={theme.spacing(1)} mb={theme.spacing(3)}>
        {isTabMenuExpanded ? <MiddleLogo /> : <SmallLogo />}
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
                onChangeLocation={onChangeLocation}
                location={location}
                isTabMenuExpanded={isTabMenuExpanded}
                translations={translations}
              />
            </Fragment>
          ))}
        </Flex>
        <ExitButton
          isTabMenuExpanded={isTabMenuExpanded}
          translations={translations}
        />
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
  onChangeLocation: PropTypes.func,
  location: PropTypes.string,
  translations: PropTypes.object,
};

export default memo(MenuTabs);
