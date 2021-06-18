import { memo } from "react";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";

import { Flex } from "components/flex";

const SwipeDelete = ({ children, itemId, setCandidateForDeletion }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCandidateForDeletion(itemId);
    },
    onSwipedRight: () => {
      setCandidateForDeletion((candidateForDeletion) => {
        if (candidateForDeletion === itemId) {
          return false;
        }
        return candidateForDeletion;
      });
    },
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
  setCandidateForDeletion: PropTypes.func,
};

export default memo(SwipeDelete);
