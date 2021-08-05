import { memo, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "wouter";

import { Flex } from "components/flex";
import MenuTabs from "./components/menu-tabs";

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
          children11={children} // CLEAR
        />
      </Flex>
      <Flex width={1}>2</Flex>
    </Flex>
  );
};

Index.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(Index);
