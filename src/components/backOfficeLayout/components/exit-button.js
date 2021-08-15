import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";

import { Flex } from "components/flex";
import { Text } from "components/text";
import LogoutIcon from "assets/icons/back-office/log_out_icon.svg";
import UserDataState from "atoms/user";
import { theme } from "theme";

const ExitButton = ({ isTabMenuExpanded, translations }) => {
  const [, setUserDataAtoms] = useRecoilState(UserDataState);

  const logout = useCallback(() => {
    setUserDataAtoms((oldValue) => ({ ...oldValue, jwt: null }));
  }, [setUserDataAtoms]);

  return (
    <Flex onClick={logout} width={1}>
      {isTabMenuExpanded ? (
        <MenuTab width={1} py={theme.spacing(1)} alignItems="center">
          <Flex pl={theme.spacing(1)}>
            <LogoutIcon />
          </Flex>
          <Text pl={theme.spacing(2)} color="var(--text-grey)">
            {translations["logout"]}
          </Text>
        </MenuTab>
      ) : (
        <MenuTab width={1} py={theme.spacing(1)} justifyContent="center">
          <LogoutIcon />
        </MenuTab>
      )}
    </Flex>
  );
};

const MenuTab = styled(Text)`
  background: var(--light-grey);
  border-left: 4px solid var(--light-grey);
`;

ExitButton.propTypes = {
  isTabMenuExpanded: PropTypes.bool,
  translations: PropTypes.object,
};

export default memo(ExitButton);
