import { memo, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

import Counter from "components/counter";
import Button from "components/button";
import { Flex } from "components/flex";
import { theme } from "theme";

const ControlButtons = ({
  translations,
  onBasketAtoms,
  basketAtoms,
  itemId,
  menuItem,
  inTheBasket,
}) => {
  const [count, setCount] = useState(1);

  const countInBasket = useMemo(() => {
    const valueInBasket = basketAtoms.order.find(
      (currentValue) => currentValue._id === itemId
    );

    return valueInBasket ? valueInBasket.count : null;
  }, [itemId, basketAtoms]);

  const changeCount = useCallback(
    (diff) => () => {
      if (count + diff <= 0) {
        return;
      }

      setCount((count) => count + diff);
    },
    [count]
  );

  const changeOrderItemCount = useCallback(
    (diff) => () => {
      if (countInBasket + diff <= 0) {
        return;
      }

      onBasketAtoms((oldOrder) => {
        return {
          ...oldOrder,
          order: oldOrder.order.map((currentValue) =>
            currentValue._id === itemId
              ? {
                  ...currentValue,
                  count: currentValue.count + diff,
                }
              : currentValue
          ),
        };
      });
    },
    [onBasketAtoms, countInBasket, itemId]
  );

  const addProductToOrder = useCallback(() => {
    onBasketAtoms((oldBasket) => {
      return {
        ...oldBasket,
        order: [
          ...oldBasket.order,
          {
            ...menuItem,
            count: count,
          },
        ],
      };
    });
  }, [menuItem, count, onBasketAtoms]);

  return (
    <Flex width={1} flex={1} direction="column-reverse" mt={theme.spacing(1)}>
      <Flex width={1} justifyContent="space-between" mb={theme.spacing(1)}>
        <Counter
          decreaseCount={
            inTheBasket ? changeOrderItemCount(-1) : changeCount(-1)
          }
          increaseCount={
            inTheBasket ? changeOrderItemCount(+1) : changeCount(+1)
          }
          count={inTheBasket ? countInBasket : count}
        />
        {inTheBasket ? (
          <Button disabled={true} mb={0}>
            {translations["already_in_the_basket"]}
          </Button>
        ) : (
          <Button onClick={addProductToOrder} mb={0}>
            {translations["order"]}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

ControlButtons.propTypes = {
  translations: PropTypes.object,
  onBasketAtoms: PropTypes.func,
  basketAtoms: PropTypes.object,
  itemId: PropTypes.string,
  menuItem: PropTypes.object,
  inTheBasket: PropTypes.bool,
};

export default memo(ControlButtons);
