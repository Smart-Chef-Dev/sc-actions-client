import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "./button";
import { Flex } from "./flex";
import { Text } from "./text";
import { theme } from "../theme";
import { useTranslation } from "../contexts/translation-context";
import Notification from "./notification";

const ConfirmationPopup = ({ text, onToggleHidden, continueButton }) => {
  const {
    strings: { confirmationPopup: translations },
  } = useTranslation();

  const continueOperation = useCallback(() => {
    continueButton();
    onToggleHidden(true);
  }, [continueButton, onToggleHidden]);

  const cancelOperation = useCallback(() => {
    onToggleHidden(true);
  }, [onToggleHidden]);

  return (
    <Notification background="var(--main-bg-color)">
      <Flex direction="column">
        <Text
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          mb={theme.spacing(1)}
        >
          {text}
        </Text>
        <Flex width={1} justifyContent="center">
          <Button onClick={continueOperation}>
            {translations["continue"]}
          </Button>
        </Flex>
        <Flex width={1} justifyContent="center">
          <Button onClick={cancelOperation}>{translations["cancel"]}</Button>
        </Flex>
      </Flex>
    </Notification>
  );
};

ConfirmationPopup.propTypes = {
  text: PropTypes.string,
  onToggleHidden: PropTypes.func,
  continueButton: PropTypes.func,
};

export default memo(ConfirmationPopup);
