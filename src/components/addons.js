import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "theme";
import { Flex } from "./flex";
import RedCheckMarkIcon from "../assets/icons/product/red_check_mark_icon.svg";
import GraySquareIcon from "../assets/icons/product/gray_square_icon.svg";
import { useRecoilState } from "recoil";
import BasketState from "../atoms/basket";
import { useTranslation } from "../contexts/translation-context";

const Addons = ({ order }) => {
  const [, setBasketAtoms] = useRecoilState(BasketState);

  const {
    strings: { addons: translations },
  } = useTranslation();

  const addModifierToAtom = useCallback(
    (addonsId, productId) => () => {
      setBasketAtoms((oldBasket) => {
        return {
          ...oldBasket,
          order: oldBasket.order.map((currentOrder) => {
            if (currentOrder._id === productId) {
              return {
                ...currentOrder,
                addons: currentOrder.addons.map((currentAddons) => {
                  if (currentAddons._id === addonsId) {
                    return {
                      ...currentAddons,
                      isIncludedInOrder: true,
                    };
                  }

                  return currentAddons;
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
    (addonsId, productId) => () => {
      setBasketAtoms((oldBasket) => {
        return {
          ...oldBasket,
          order: oldBasket.order.map((currentOrder) => {
            if (currentOrder._id === productId) {
              return {
                ...currentOrder,
                addons: currentOrder.addons.map((currentAddons) => {
                  if (currentAddons._id === addonsId) {
                    return {
                      ...currentAddons,
                      isIncludedInOrder: false,
                    };
                  }

                  return currentAddons;
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
    <Flex width={1} direction="column">
      <Text color="var(--text-grey)">{translations["extra_add_ons"]}</Text>
      {order.addons.map((currentAddons) => (
        <Flex
          justifyContent="space-between"
          width={1}
          key={currentAddons._id}
          mt={theme.spacing(1)}
        >
          <Flex>
            <Flex>
              {currentAddons.isIncludedInOrder ? (
                <Flex
                  onClick={removingModifierToAtom(currentAddons._id, order._id)}
                >
                  <RedCheckMarkIcon />
                  <Text color="var(--light-grey)" ml={theme.spacing(1)}>
                    {currentAddons.name}
                  </Text>
                </Flex>
              ) : (
                <Flex onClick={addModifierToAtom(currentAddons._id, order._id)}>
                  <GraySquareIcon />
                  <Text color="var(--light-grey)" ml={theme.spacing(1)}>
                    {currentAddons.name}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          {!!currentAddons.price && (
            <Text color="var(--main-color)">{currentAddons.price}$</Text>
          )}
        </Flex>
      ))}
    </Flex>
  );
};

Addons.propTypes = {
  order: PropTypes.object,
};

export default memo(Addons);
