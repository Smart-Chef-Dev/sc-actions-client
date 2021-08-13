import { memo } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { theme } from "theme";

const ControlButton = ({ Icon, buttonAction, stroke }) => {
  return (
    <Flex mr={theme.spacing(1)} alignItems="center">
      <Icon onClick={buttonAction} stroke={stroke} />
    </Flex>
  );
};

ControlButton.propTypes = {
  Icon: PropTypes.elementType,
  buttonAction: PropTypes.func,
  stroke: PropTypes.string,
};

export default memo(ControlButton);
