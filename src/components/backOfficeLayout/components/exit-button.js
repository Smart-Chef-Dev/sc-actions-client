import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import LogOutIcon from "assets/icons/back-office/log_out_icon.svg";
import { theme } from "theme";
import { useRecoilState } from "recoil";
import UserDataState from "../../../atoms/user";

const ExitButton = ({ isTabMenuExpanded, translations }) => {
  const [, setUserDataAtoms] = useRecoilState(UserDataState);

  const goOut = useCallback(() => {
    setUserDataAtoms((oldValue) => ({ ...oldValue, jwt: null }));
  }, [setUserDataAtoms]);

  return (
    <Flex onClick={goOut}>
      {isTabMenuExpanded ? (
        <MenuTab width={1} py={theme.spacing(1)} alignItems="center">
          <Flex pl={theme.spacing(1)}>
            <LogOutIcon />
          </Flex>
          <Text pl={theme.spacing(2)} color="var(--text-grey)">
            {translations["log_out"]}
          </Text>
        </MenuTab>
      ) : (
        <MenuTab width={1} py={theme.spacing(1)} justifyContent="center">
          <LogOutIcon />
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
