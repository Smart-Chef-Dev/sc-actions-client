import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { theme } from "theme";
import { Text } from "components/text";
import { Divider } from "components/divider";
import { Img } from "components/img";
import SwipeDelete from "./swipe-delete";
import AddonsBasket from "./addons-basket";
import MenuItem from "./menu-item";

import BasketIcon from "assets/icons/basket/basket-icon.svg";
import { formatCurrency } from "utils/formatCurrency";

const MenuItems = ({ basketAtoms, onBasketAtoms, translations, totalCost }) => {
  const [preRemoveItemId, setPreRemoveItemId] = useState(null);
  const [unfoldedItemId, setUnfoldedItemId] = useState(null);

  const removeOrder = useCallback(
    () =>
      onBasketAtoms((oldOrder) => ({
        ...oldOrder,
        order: oldOrder.order.filter(
          (currentValue) => currentValue._id !== preRemoveItemId
        ),
      })),
    [onBasketAtoms, preRemoveItemId]
  );

  return (
    <>
      {basketAtoms.order.map((currentValue) => (
        <Flex key={currentValue._id} width={1} direction="column">
          <SwipeDelete
            itemId={currentValue._id}
            onPreRemove={setPreRemoveItemId}
          >
            {preRemoveItemId === currentValue._id ? (
              <Flex width={1} height={1} position="relative">
                <s.RemoteComponent
                  p={theme.spacing(1)}
                  width={1}
                  alignItems="center"
                >
                  <MenuItem
                    menuItem={currentValue}
                    unfoldedItemId={unfoldedItemId}
                    basketAtoms={basketAtoms}
                    onBasketAtoms={onBasketAtoms}
                    onUnfoldedItemId={setUnfoldedItemId}
                  />
                </s.RemoteComponent>
                <s.DeleteButton
                  alignItems="center"
                  justifyContent="center"
                  onClick={removeOrder}
                  width={1}
                  height={1}
                >
                  <BasketIcon />
                </s.DeleteButton>
              </Flex>
            ) : (
              <Flex p={theme.spacing(1)} width={1} alignItems="center">
                <MenuItem
                  menuItem={currentValue}
                  unfoldedItemId={unfoldedItemId}
                  basketAtoms={basketAtoms}
                  onBasketAtoms={onBasketAtoms}
                  onUnfoldedItemId={setUnfoldedItemId}
                />
              </Flex>
            )}
          </SwipeDelete>
          <AddonsBasket
            currentValue={currentValue}
            unfoldedItemId={unfoldedItemId}
          />
          <Divider ml={theme.spacing(1)} />
        </Flex>
      ))}
      <Flex
        justifyContent="space-between"
        width={1}
        px={theme.spacing(1)}
        mt={theme.spacing(1)}
        boxSizing="border-box"
      >
        <Text fontWeight="bold">{translations["total"]}</Text>
        <Text fontWeight="bold">
          {formatCurrency(
            basketAtoms.order[0]?.category.restaurant.currencyCode,
            totalCost
          )}
        </Text>
      </Flex>
    </>
  );
};

const s = {
  Preview: styled(Img)`
    max-width: 70px;
    min-height: 70px;
    object-fit: cover;

    border-radius: 16px;
  `,
  DeleteButton: styled(Flex)`
    max-width: 60px;
    max-height: 110px;

    background: var(--main-color);

    position: absolute;
    right: 0;
  `,
  RemoteComponent: styled(Flex)`
    background: var(--grey-color-for-selected-object);

    position: relative;
    right: 58px;
  `,
};

MenuItems.propTypes = {
  basketAtoms: PropTypes.object,
  onBasketAtoms: PropTypes.func,
  translations: PropTypes.object,
  totalCost: PropTypes.string,
};

export default memo(MenuItems);
