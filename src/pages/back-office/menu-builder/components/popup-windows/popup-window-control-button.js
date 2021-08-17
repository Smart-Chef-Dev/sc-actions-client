import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "components/button";
import { Flex } from "components/flex";

const PopupWindowControlButton = ({
  onToggleHidden,
  nameContinueButton,
  nameCancelButton,
  actionContinueButton,
  buttonWidth,
  directionOfButtons,
}) => {
  const cancelAddingCategory = useCallback(() => {
    onToggleHidden(true);
  }, [onToggleHidden]);

  return (
    <Flex
      justifyContent="space-between"
      direction={directionOfButtons}
      alignItems="center"
      width={1}
    >
      <Button
        background="var(--text-grey)"
        width={buttonWidth}
        onClick={cancelAddingCategory}
        type="button"
      >
        {nameCancelButton}
      </Button>
      <Button width={buttonWidth} type="submit" onClick={actionContinueButton}>
        {nameContinueButton}
      </Button>
    </Flex>
  );
};

PopupWindowControlButton.propTypes = {
  translations: PropTypes.object,
  nameCancelButton: PropTypes.string,
  nameContinueButton: PropTypes.string,
  onToggleHidden: PropTypes.func,
  actionContinueButton: PropTypes.func,
  buttonWidth: PropTypes.string,
  directionOfButtons: PropTypes.string,
};

export default memo(PopupWindowControlButton);
