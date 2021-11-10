import { memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import IconExit from "assets/icons/menu-tabs/icon-exit.svg";
import { Divider } from "components/divider";
import UserDataState from "atoms/user";
import { theme } from "theme";

const TopPanel = ({ translations }) => {
  const [, setUserDataAtoms] = useRecoilState(UserDataState);

  const logout = useCallback(() => {
    setUserDataAtoms((oldValue) => ({ ...oldValue, jwt: null }));
  }, [setUserDataAtoms]);

  return (
    <Flex
      height={1}
      width={1}
      flex={1}
      direction="column"
      pl={theme.spacing(1)}
      boxSizing="border-box"
    >
      <Flex width={1} justifyContent="space-between">
        <Text
          p={theme.spacing(1)}
          pl={0}
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
        >
          {translations["subscriptions"]}
        </Text>
        <Flex alignItems="center" height={1} mr={theme.spacing(5)}>
          <IconExit fill="var(--main-text-color)" onClick={logout} />
        </Flex>
      </Flex>
      <Divider />
    </Flex>
  );
};

TopPanel.propTypes = {
  translations: PropTypes.object,
};

export default memo(TopPanel);
