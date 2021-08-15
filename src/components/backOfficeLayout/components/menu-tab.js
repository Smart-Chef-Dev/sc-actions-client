import { memo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Text } from "components/text";
import { Flex } from "components/flex";
import { theme } from "theme";

const MenuTab = ({
  menuTab,
  onSelectedTab,
  selectedTab,
  onChangeLocation,
  location,
  isTabMenuExpanded,
  translations,
}) => {
  const [isMatch] = useRoute(menuTab.route);

  useEffect(
    () => isMatch && onSelectedTab(menuTab),
    [isMatch, menuTab, onSelectedTab]
  );

  const selectTab = useCallback(() => {
    const path = menuTab.route;
    const restaurantId = location.split("/").pop();

    onChangeLocation(path + restaurantId);
  }, [menuTab, onChangeLocation, location]);

  return isTabMenuExpanded ? (
    <Flex width={1} onClick={selectTab}>
      {selectedTab.route === menuTab.route ? (
        <s.SelectedTab
          width={1}
          py={theme.spacing(1)}
          pl={theme.spacing(1)}
          alignItems="center"
        >
          <menuTab.icon />
          <Text pl={theme.spacing(2)} color="var(--text-grey)">
            {translations[menuTab.id]}
          </Text>
        </s.SelectedTab>
      ) : (
        <s.Tab width={1} py={theme.spacing(1)} alignItems="center">
          <menuTab.icon />
          <Text pl={theme.spacing(2)}>{translations[menuTab.id]}</Text>
        </s.Tab>
      )}
    </Flex>
  ) : (
    <Flex width={1} onClick={selectTab} alignItems="center">
      {selectedTab.route === menuTab.route ? (
        <s.SelectedTab width={1} justifyContent="center" py={theme.spacing(1)}>
          <menuTab.icon />
        </s.SelectedTab>
      ) : (
        <s.Tab width={1} justifyContent="center" py={theme.spacing(1)}>
          <menuTab.icon />
        </s.Tab>
      )}
    </Flex>
  );
};

const s = {
  SelectedTab: styled(Text)`
    background: var(--light-grey);
    border-left: 4px solid var(--main-color);
  `,
  Tab: styled(Text)`
    border-left: 4px solid var(--main-bg-color);
  `,
};

MenuTab.propTypes = {
  menuTab: PropTypes.object,
  selectedTab: PropTypes.object,
  onSelectedTab: PropTypes.func,
  onChangeLocation: PropTypes.func,
  location: PropTypes.string,
  isTabMenuExpanded: PropTypes.bool,
  translations: PropTypes.object,
};

export default memo(MenuTab);
