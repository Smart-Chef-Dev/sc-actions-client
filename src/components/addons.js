import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "theme";
import { Flex } from "./flex";
import RedCheckMarkIcon from "../assets/icons/product/red_check_mark_icon.svg";
import GraySquareIcon from "../assets/icons/product/gray_square_icon.svg";
import { useRecoilState } from "recoil";
import BasketState from "../atoms/basket";

const Addons = ({ order }) => {
  const [, setBasketAtoms] = useRecoilState(BasketState);

  const addModifierToAtom = useCallback(
    (modifiersId, productId) => () => {
      setBasketAtoms((oldBasket) => {
        return {
          ...oldBasket,
          order: oldBasket.order.map((currentOrder) => {
            if (currentOrder._id === productId) {
              return {
                ...currentOrder,
                modifiers: currentOrder.modifiers.map((currentModifiers) => {
                  if (currentModifiers._id === modifiersId) {
                    return {
                      ...currentModifiers,
                      isIncludedInOrder: true,
                    };
                  }

                  return currentModifiers;
                }),
              };
            }

            return currentOrder;
          }),
        };
      });
    },
    [setBasketAtoms]
  );

  const removingModifierToAtom = useCallback(
    (modifiersId, productId) => () => {
      setBasketAtoms((oldBasket) => {
        return {
          ...oldBasket,
          order: oldBasket.order.map((currentOrder) => {
            if (currentOrder._id === productId) {
              return {
                ...currentOrder,
                modifiers: currentOrder.modifiers.map((currentModifiers) => {
                  if (currentModifiers._id === modifiersId) {
                    return {
                      ...currentModifiers,
                      isIncludedInOrder: false,
                    };
                  }

                  return currentModifiers;
                }),
              };
            }

            return currentOrder;
          }),
        };
      });
    },
    [setBasketAtoms]
  );

  return (
    <Flex
      px={theme.spacing(1)}
      mb={theme.spacing(1)}
      width={1}
      direction="column"
      boxSizing="border-box"
    >
      <Text color="var(--text-grey)">extra_add_ons</Text>
      {order.modifiers.map((currentModifiers) => (
        <Flex
          justifyContent="space-between"
          width={1}
          key={currentModifiers._id}
          mt={theme.spacing(1)}
        >
          <Flex>
            <Flex mr={theme.spacing(1)}>
              {currentModifiers.isIncludedInOrder ? (
                <RedCheckMarkIcon
                  onClick={removingModifierToAtom(
                    currentModifiers._id,
                    order._id
                  )}
                />
              ) : (
                <GraySquareIcon
                  onClick={addModifierToAtom(currentModifiers._id, order._id)}
                />
              )}
            </Flex>
            <Text color="var(--light-grey)">{currentModifiers.name}</Text>
          </Flex>
          <Text color="var(--main-color)">{currentModifiers.price}$</Text>
        </Flex>
      ))}
    </Flex>
  );
};

Addons.propTypes = {
  order: PropTypes.object,
};

export default memo(Addons);
