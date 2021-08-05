import { memo, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { useLocation } from "wouter";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuTabs from "./components/menu-tabs";
import { theme } from "theme";

const Index = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState({});
  const [location, setLocation] = useLocation();

  return (
    <Flex width={1} height={1} flex={1}>
      <Flex width={1} height={1} flex={1} direction="column">
        <MenuTabs
          selectedTab={selectedTab}
          onSelectedTab={setSelectedTab}
          onLocation={setLocation}
          location={location}
        />
      </Flex>
      <Flex width={1} height={1} direction="column">
        <Flex height={1} flex={1}>
          <s.TabTitle fontWeight="bold" p={theme.spacing(1)}>
            {selectedTab.name}
          </s.TabTitle>
        </Flex>
        <s.ChildrenContainer height={1} width={1} overflowY="hidden">
          {children}
        </s.ChildrenContainer>
      </Flex>
    </Flex>
  );
};

const s = {
  ChildrenContainer: styled(Flex)`
    background: #e5e5ea;
  `,
  TabTitle: styled(Text)`
    border-bottom: 4px solid var(--main-color);
  `,
};

Index.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(Index);
