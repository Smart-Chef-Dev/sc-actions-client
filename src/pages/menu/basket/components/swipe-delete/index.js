import { memo } from "react";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";

import { Flex } from "components/flex";

const SwipeDelete = ({ children, itemId, setCandidateForDeletion, index }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCandidateForDeletion({
        indexInBasketAtom: index,
        id: itemId,
      });
    },
    onSwipedRight: () => {
      setCandidateForDeletion((candidateForDeletion) => {
        if (candidateForDeletion.id === itemId) {
          return {
            indexInBasketAtom: null,
            id: null,
          };
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
  index: PropTypes.number,
};

export default memo(SwipeDelete);
