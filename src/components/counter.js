import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "theme";
import { Flex } from "./flex";

import IncreaseCount from "assets/icons/counter/increase_count.svg";
import DecreaseCount from "assets/icons/counter/decrease_count.svg";

const Counter = ({ reduceCount, enlargeCount, count }) => {
  return (
    <Flex height={1} alignItems="center">
      <DecreaseCount onClick={reduceCount} />
      <Text fontSize={theme.fontSize(3)} mx={theme.spacing(1)}>
        {count}
      </Text>
      <IncreaseCount onClick={enlargeCount} />
    </Flex>
  );
};

Counter.propTypes = {
  reduceCount: PropTypes.func,
  enlargeCount: PropTypes.func,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(Counter);
