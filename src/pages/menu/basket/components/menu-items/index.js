import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { theme } from "theme";
import { Text } from "components/text";
import { Divider } from "components/divider";
import { Img } from "components/img";
import Counter from "components/counter";
import SwipeDelete from "./components/swipe-delete";
import AddonsBasket from "./components/addons-basket";

import BasketIcon from "assets/icons/basket/basket-icon.svg";
import { formatCurrency } from "utils/formatCurrency";

const MenuItems = ({ basketAtoms, onBasketAtoms, translations, totalCost }) => {
  const [preRemoveItemId, setPreRemoveItemId] = useState(null);
  const [unfoldedItemId, setUnfoldedItemId] = useState(null);

  const removeOrder = useCallback(() => {
    onBasketAtoms((oldOrder) => {
      return {
        ...oldOrder,
        order: oldOrder.order.filter(
          (currentValue) => currentValue._id !== preRemoveItemId
        ),
      };
    });
  }, [onBasketAtoms, preRemoveItemId]);

  const changeOrderItemCount = useCallback(
    (diff, productId) => () => {
      const product = basketAtoms.order.find(
        (currentValue) => currentValue._id === productId
      );

      if (product.count + diff <= 0) {
        return;
      }

      onBasketAtoms((oldOrder) => {
        return {
          ...oldOrder,
          order: oldOrder.order.map((currentValue) =>
            currentValue._id === productId
              ? {
                  ...currentValue,
                  count: currentValue.count + diff,
                }
              : currentValue
          ),
        };
      });
    },
    [basketAtoms, onBasketAtoms]
  );

  const calculateSumOfAddons = useCallback((addons) => {
    return addons.reduce((previousValues, currentValue) => {
      if (currentValue.isIncludedInOrder) {
        return previousValues + +currentValue.price;
      }
      return previousValues;
    }, 0);
  }, []);

  const expandItem = useCallback(
    (productId, isAddons) => () => {
      if (!isAddons) {
        return;
      }

      unfoldedItemId === productId
        ? setUnfoldedItemId(null)
        : setUnfoldedItemId(productId);
    },
    [unfoldedItemId]
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
                  <s.Preview
                    src={currentValue.pictureUrl}
                    alt={currentValue.name}
                    onClick={expandItem(
                      currentValue._id,
                      !!currentValue.addons.length
                    )}
                  />
                  <Text
                    fontSize={theme.fontSize(0)}
                    pl={theme.spacing(1)}
                    width={1}
                    onClick={expandItem(
                      currentValue._id,
                      !!currentValue.addons.length
                    )}
                  >
                    {currentValue.name}
                  </Text>
                  <Flex
                    directio="row-reverse"
                    width={1}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Counter
                      decreaseCount={changeOrderItemCount(-1, currentValue._id)}
                      increaseCount={changeOrderItemCount(+1, currentValue._id)}
                      count={currentValue.count}
                    />
                    {currentValue.addons.length &&
                    currentValue.addons.find((m) => m.isIncludedInOrder) ? (
                      <Flex
                        direction="column"
                        ml={theme.spacing(2)}
                        alignItems="center"
                      >
                        <Text>
                          {formatCurrency(
                            currentValue.category.restaurant.currencyCode,
                            calculateSumOfAddons(currentValue.addons)
                          )}
                        </Text>
                        <Text>+</Text>
                        <Text>
                          {formatCurrency(
                            currentValue.category.restaurant.currencyCode,
                            currentValue.price
                          )}
                        </Text>
                      </Flex>
                    ) : (
                      <Text pl={theme.spacing(2)}>
                        {formatCurrency(
                          currentValue.category.restaurant.currencyCode,
                          currentValue.price
                        )}
                      </Text>
                    )}
                  </Flex>
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
                <s.Preview
                  src={currentValue.pictureUrl}
                  alt={currentValue.name}
                  onClick={expandItem(
                    currentValue._id,
                    !!currentValue.addons.length
                  )}
                />
                <Text
                  fontSize={theme.fontSize(0)}
                  pl={theme.spacing(1)}
                  width={1}
                  onClick={expandItem(
                    currentValue._id,
                    !!currentValue.addons.length
                  )}
                >
                  {currentValue.name}
                </Text>
                <Flex
                  directio="row-reverse"
                  width={1}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Counter
                    decreaseCount={changeOrderItemCount(-1, currentValue._id)}
                    increaseCount={changeOrderItemCount(+1, currentValue._id)}
                    count={currentValue.count}
                  />
                  <Text pl={theme.spacing(2)}>{currentValue.price}$</Text>
                </Flex>
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
        <Text fontWeight="bold">{totalCost + "$"}</Text>
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
    background: var(--color-for-selected-object);

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
