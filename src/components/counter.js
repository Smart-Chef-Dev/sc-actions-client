import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "theme";
import { Flex } from "./flex";

import PlusIcon from "assets/icons/counter/plus_icon.svg";
import MinusIcon from "assets/icons/counter/minus_icon.svg";

const Counter = ({ decreaseCount, increaseCount, count }) => {
  return (
    <Flex height={1} alignItems="center">
      <MinusIcon onClick={decreaseCount} />
      <Text fontSize={theme.fontSize(3)} mx={theme.spacing(1)}>
        {count}
      </Text>
      <PlusIcon onClick={increaseCount} />
    </Flex>
  );
};

Counter.propTypes = {
  decreaseCount: PropTypes.func,
  increaseCount: PropTypes.func,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(Counter);
