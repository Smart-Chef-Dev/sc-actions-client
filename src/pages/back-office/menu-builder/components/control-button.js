import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { theme } from "theme";
import Title from "components/title";

const ControlButton = ({ Icon, buttonAction, stroke, title }) => {
  const [isFocusButton, setFocusButton] = useState(false);

  const focusAppeared = useCallback(() => setFocusButton(true), []);
  const focusIsGone = useCallback(() => setFocusButton(false), []);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation()
  }, [])

  return (
    <Flex onClick={stopPropagation}>
      {isFocusButton && <Title title={title} />}
      <Flex
        onMouseEnter={focusAppeared}
        onMouseLeave={focusIsGone}
        mr={theme.spacing(1)}
        alignItems="center"
      >
        <Icon onClick={buttonAction} stroke={stroke} />
      </Flex>
    </Flex>
  );
};

ControlButton.propTypes = {
  Icon: PropTypes.elementType,
  buttonAction: PropTypes.func,
  stroke: PropTypes.string,
  title: PropTypes.string,
};

export default memo(ControlButton);
