import { memo } from "react";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";

import { Flex } from "components/flex";

const SwipeDelete = ({ children, itemId, onPreRemove }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onPreRemove(itemId),
    onSwipedRight: () =>
      onPreRemove((oldValue) => (oldValue === itemId ? null : oldValue)),
  });

  return (
    <Flex {...handlers} width={1}>
      {children}
    </Flex>
  );
};

SwipeDelete.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  itemId: PropTypes.string,
  onPreRemove: PropTypes.func,
};

export default memo(SwipeDelete);
