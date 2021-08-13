import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "components/button";
import { Flex } from "components/flex";

const PopupWindowControlButton = ({
  onToggleHidden,
  translations,
  buttonName,
  buttonAction,
  buttonWidth,
}) => {
  const cancelAddingCategory = useCallback(() => {
    onToggleHidden(true);
  }, [onToggleHidden]);

  return (
    <Flex justifyContent="space-between" width={1}>
      <Button
        background="var(--text-grey)"
        width={buttonWidth}
        mb="0"
        onClick={cancelAddingCategory}
        type="button"
      >
        {translations["cancel"]}
      </Button>
      <Button width={buttonWidth} mb="0" type="submit" onClick={buttonAction}>
        {buttonName}
      </Button>
    </Flex>
  );
};

PopupWindowControlButton.propTypes = {
  translations: PropTypes.object,
  buttonName: PropTypes.string,
  onToggleHidden: PropTypes.func,
  buttonAction: PropTypes.func,
  buttonWidth: PropTypes.string,
};

export default memo(PopupWindowControlButton);
