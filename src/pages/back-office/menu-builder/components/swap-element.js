import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { useMutation, useQueryClient } from "react-query";

import { Flex } from "components/flex";
import UpArrow from "assets/icons/back-office/up_arrow.svg";
import ArrowToDown from "assets/icons/back-office/arrow_to_down.svg";
import { theme } from "theme";

const SwapElement = ({
  queryKey,
  index,
  element,
  isButtonsDisplay,
  swapService,
}) => {
  const queryClient = useQueryClient();
  const allElement = queryClient.getQueryData(queryKey);

  const swapElement = useMutation(swapService, {
    onSuccess: (data, requestData) => {
      const element2 = allElement.find(
        (currentElement) => currentElement._id === requestData.elementId2
      );

      queryClient.setQueryData(
        queryKey,
        allElement.map((currentElement) => {
          if (currentElement._id === requestData.elementId2) {
            return element;
          }

          if (currentElement._id === requestData.elementId1) {
            return element2;
          }

          return currentElement;
        })
      );
    },
  });

  const raiseMenuItem = useCallback(async () => {
    if (index === 0) {
      return;
    }

    await swapElement.mutateAsync({
      elementId1: element._id,
      elementId2: allElement[index - 1]._id,
    });
  }, [index, allElement, element, swapElement]);

  const omitMenuItem = useCallback(async () => {
    if (index === allElement.length - 1) {
      return;
    }

    await swapElement.mutateAsync({
      elementId1: element._id,
      elementId2: allElement[index + 1]._id,
    });
  }, [index, allElement, element, swapElement]);

  return (
    <Flex
      direction="column"
      mr={theme.spacing(1)}
      onClick={useCallback((e) => e.stopPropagation(), [])}
    >
      {isButtonsDisplay ? (
        <Flex direction="column">
          <UpArrow onClick={raiseMenuItem} />
          <ArrowToDown onClick={omitMenuItem} />
        </Flex>
      ) : (
        <ButtonsDoNotUse direction="column">
          <UpArrow />
          <ArrowToDown />
        </ButtonsDoNotUse>
      )}
    </Flex>
  );
};

const ButtonsDoNotUse = styled(Flex)`
  opacity: 0;
`;

SwapElement.propTypes = {
  queryKey: PropTypes.array,
  index: PropTypes.number,
  element: PropTypes.object,
  isButtonsDisplay: PropTypes.bool,
  swapService: PropTypes.func,
};

export default memo(SwapElement);
