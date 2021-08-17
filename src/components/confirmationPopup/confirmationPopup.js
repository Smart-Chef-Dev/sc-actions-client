import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "../flex";
import { Text } from "../text";
import ConfirmationPopupControlButton from "./confirmation-popup-control-button";

const ConfirmationPopup = ({
  texts,
  onToggleHidden,
  nameContinueButton,
  nameCancelButton,
  actionButton,
  directionOfButtons,
  buttonWidth,
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
      height={1}
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

      <ConfirmationPopupControlButton
        onToggleHidden={onToggleHidden}
        nameContinueButton={nameContinueButton}
        nameCancelButton={nameCancelButton}
        actionContinueButton={actionContinueButton}
        directionOfButtons={directionOfButtons}
        buttonWidth={buttonWidth}
      />
    </Flex>
  );
};

ConfirmationPopup.propTypes = {
  texts: PropTypes.array,
  onToggleHidden: PropTypes.func,
  nameContinueButton: PropTypes.string,
  nameCancelButton: PropTypes.string,
  buttonWidth: PropTypes.string,
  actionButton: PropTypes.func,
  directionOfButtons: PropTypes.string,
};

export default memo(ConfirmationPopup);
