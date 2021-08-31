import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Text } from "components/text";
import { Flex } from "components/flex";
import { Img } from "components/img";
import Counter from "components/counter";
import MenuItemPrice from "./menu-item-price";
import { theme } from "theme";

const MenuItem = ({
  menuItem,
  onUnfoldedItemId,
  unfoldedItemId,
  basketAtoms,
  onBasketAtoms,
}) => {
  const changeOrderItemCount = useCallback(
    (diff, productId) => () => {
      const product = basketAtoms.order.find(
        (currentValue) => currentValue._id === productId
      );

      if (product.count + diff <= 0) {
        return onBasketAtoms((oldOrder) => ({
          ...oldOrder,
          order: oldOrder.order.filter(
            (currentValue) => currentValue._id !== productId
          ),
        }));
      }

      onBasketAtoms((oldOrder) => ({
        ...oldOrder,
        order: oldOrder.order.map((currentValue) =>
          currentValue._id === productId
            ? {
                ...currentValue,
                count: currentValue.count + diff,
              }
            : currentValue
        ),
      }));
    },
    [basketAtoms, onBasketAtoms]
  );

  const expandItem = useCallback(
    (productId, isAddons) => () => {
      if (!isAddons) {
        return;
      }

      unfoldedItemId === productId
        ? onUnfoldedItemId(null)
        : onUnfoldedItemId(productId);
    },
    [unfoldedItemId, onUnfoldedItemId]
  );

  return (
    <>
      <Preview
        src={menuItem.pictureUrl}
        alt={menuItem.name}
        onClick={expandItem(menuItem._id, !!menuItem.addons.length)}
      />
      <Text
        fontSize={theme.fontSize(0)}
        pl={theme.spacing(1)}
        width={1}
        onClick={expandItem(menuItem._id, !!menuItem.addons.length)}
      >
        {menuItem.name}
      </Text>
      <Flex
        directio="row-reverse"
        width={1}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Counter
          decreaseCount={changeOrderItemCount(-1, menuItem._id)}
          increaseCount={changeOrderItemCount(+1, menuItem._id)}
          count={menuItem.count}
        />
        <MenuItemPrice menuItem={menuItem} />
      </Flex>
    </>
  );
};

const Preview = styled(Img)`
  max-width: 70px;
  min-height: 70px;
  object-fit: cover;

  border-radius: 16px;
`;

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  onUnfoldedItemId: PropTypes.func,
  unfoldedItemId: PropTypes.string,
  basketAtoms: PropTypes.object,
  onBasketAtoms: PropTypes.func,
};

export default memo(MenuItem);
