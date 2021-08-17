import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Flex } from "./flex";
import { Text } from "./text";
import PopupWindowControlButton from "../pages/back-office/menu-builder/components/popup-windows/popup-window-control-button";
import { theme } from "../theme";

const ConfirmationPopup = ({
  texts,
  onToggleHidden,
  nameContinueButton,
  nameCancelButton,
  actionButton,
}) => {
  const actionContinueButton = useCallback(() => {
    actionButton();
    onToggleHidden(true);
  }, [onToggleHidden, actionButton]);

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      width={1}
      p={theme.spacing(3)}
    >
      <Flex direction="column" width={1}>
        {texts.map((t, i) => (
          <Text
            key={i}
            textAlign="center"
            justifyContent="center"
            width={1}
            {...t.property}
          >
            {t.text}
          </Text>
        ))}
      </Flex>

      <PopupWindowControlButton
        onToggleHidden={onToggleHidden}
        nameContinueButton={nameContinueButton}
        nameCancelButton={nameCancelButton}
        actionContinueButton={actionContinueButton}
        buttonWidth="auto"
      />
    </Flex>
  );
};

ConfirmationPopup.propTypes = {
  texts: PropTypes.array,
  onToggleHidden: PropTypes.func,
  nameContinueButton: PropTypes.string,
  nameCancelButton: PropTypes.string,
  actionButton: PropTypes.func,
};

export default memo(ConfirmationPopup);
