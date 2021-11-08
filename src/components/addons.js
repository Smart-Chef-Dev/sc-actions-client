import { memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import PropTypes from "prop-types";

import { Text } from "./text";
import { Flex } from "./flex";
import { theme } from "theme";
import { useTranslation } from "../contexts/translation-context";

import GraySquareIcon from "../assets/icons/product/gray_square_icon.svg";
import RedCheckMarkIcon from "../assets/icons/product/check_marks_in_red_box.svg";

import BasketState from "../atoms/basket";
import { formatCurrency } from "../utils/formatCurrency";

const Addons = ({ order }) => {
  const [, setBasketAtoms] = useRecoilState(BasketState);

  const {
    strings: { addons: translations },
  } = useTranslation();

  const changeAddonState = useCallback(
    (addonsId, productId, isAddonsAdded) => () => {
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
                      isIncludedInOrder: isAddonsAdded,
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
                  onClick={changeAddonState(
                    currentAddons._id,
                    order._id,
                    false
                  )}
                >
                  <RedCheckMarkIcon />
                  <Text color="var(--grey)" ml={theme.spacing(1)}>
                    {currentAddons.name}
                  </Text>
                </Flex>
              ) : (
                <Flex
                  onClick={changeAddonState(currentAddons._id, order._id, true)}
                >
                  <GraySquareIcon />
                  <Text color="var(--grey)" ml={theme.spacing(1)}>
                    {currentAddons.name}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          {!!currentAddons.price && (
            <Text color="var(--main-color)">
              {formatCurrency(
                order.category.restaurant.currencyCode,
                currentAddons.price
              )}
            </Text>
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
