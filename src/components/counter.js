import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "../theme";
import { Flex } from "./flex";

const Counter = ({ reduceCount, enlargeCount, count }) => {
  return (
    <Flex height={1} alignItems="center">
      <Text
        fontSize={theme.fontSize(3)}
        color="var(--main-color)"
        onClick={reduceCount}
      >
        -
      </Text>
      <Text fontSize={theme.fontSize(3)} mx={theme.spacing(1)}>
        {count}
      </Text>
      <Text
        fontSize={theme.fontSize(3)}
        color="var(--main-color)"
        onClick={enlargeCount}
      >
        +
      </Text>
    </Flex>
  );
};

Counter.propTypes = {
  reduceCount: PropTypes.func,
  enlargeCount: PropTypes.func,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(Counter);
