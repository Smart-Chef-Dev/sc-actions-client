import { memo, useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import { Divider } from "components/divider";
import Button from "components/button";
import SwipeDelete from "./components/swipe-delete";
import BasketState from "atoms/basket";
import Counter from "components/counter";
import { useTranslation } from "contexts/translation-context";

import { theme } from "theme";
import { Routes } from "constants/routes";

import Icon from "assets/icons/basket/icon.svg";
import BasketIcon from "assets/icons/basket/basket-icon.svg";
import RedCheckMarkIcon from "assets/icons/product/red_check_mark_icon.svg";
import GraySquareIcon from "assets/icons/product/gray_square_icon.svg";

const Basket = () => {
  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const [preRemoveItemId, setPreRemoveItemId] = useState(null);
  const [unfoldedItemId, setUnfoldedItemId] = useState(null);
  const [isDisable, setIsDisable] = useState(!basketAtoms.order.length);

  const [, setLocation] = useLocation();
  const [, { restaurantId, tableId }] = useRoute(Routes.BASKET);

  const {
    strings: { basket: translations },
  } = useTranslation();

  const totalCost = useMemo(() => {
    return basketAtoms.order
      .reduce((previousOrder, currentOrder) => {
        const modifiers = currentOrder.modifiers.reduce(
          (previousModifiers, currentModifier) => {
            if (currentModifier.isIncludedInOrder) {
              return previousModifiers + +currentModifier.price;
            }

            return previousModifiers;
          },
          0
        );

        return (
          previousOrder + modifiers + +currentOrder.price * currentOrder.count
        );
      }, 0)
      .toFixed(1);
  }, [basketAtoms]);

  const countMenuItems = useMemo(() => {
    return basketAtoms.order.reduce(
      (previousValues, currentValue) => previousValues + +currentValue.count,
      0
    );
  }, [basketAtoms]);

  const changeOrderItemCount = useCallback(
    (diff, productId) => () => {
      const product = basketAtoms.order.find(
        (currentValue) => currentValue._id === productId
      );

      if (product.count + diff <= 0) {
        return;
      }

      setBasketAtoms((oldOrder) => {
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
    [basketAtoms, setBasketAtoms]
  );

  const changeNumberOfPeople = useCallback(
    (diff) => () => {
      if (basketAtoms.personCount + diff >= 1)
        setBasketAtoms({
          ...basketAtoms,
          personCount: basketAtoms.personCount + diff,
        });
    },
    [basketAtoms, setBasketAtoms]
  );

  const removeOrder = useCallback(() => {
    setBasketAtoms((oldOrder) => {
      return {
        ...oldOrder,
        order: oldOrder.order.filter(
          (currentValue) => currentValue._id !== preRemoveItemId
        ),
      };
    });
  }, [setBasketAtoms, preRemoveItemId]);

  const submitOrder = useCallback(() => {
    try {
      setIsDisable(true);
      fetch(`/api/message/${restaurantId}/${tableId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basketAtoms),
      }).finally(() => {
        setBasketAtoms((oldBasket) => {
          return {
            ...oldBasket,
            personCount: 1,
            order: [],
          };
        });
        setLocation(`/restaurant/${restaurantId}/${tableId}`);
      });
    } catch (err) {
      setIsDisable(false);
      console.log(err);
    }
  }, [
    restaurantId,
    tableId,
    setLocation,
    setIsDisable,
    basketAtoms,
    setBasketAtoms,
  ]);

  const calculateSumOfModifiers = useCallback((modifiers) => {
    return modifiers.reduce((previousValues, currentValue) => {
      if (currentValue.isIncludedInOrder) {
        return previousValues + +currentValue.price;
      }
      return previousValues;
    }, 0);
  }, []);

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

  const expandItem = useCallback(
    (productId, isModifiers) => () => {
      if (!isModifiers) {
        return;
      }

      unfoldedItemId === productId
        ? setUnfoldedItemId(null)
        : setUnfoldedItemId(productId);
    },
    [unfoldedItemId]
  );

  return (
    <Flex direction="column" height={1} width={1} boxSizing="border-box">
      <Flex height={1} weight={1} flex={1}>
        <Text
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
          pt={theme.spacing(2)}
          pb={theme.spacing(1)}
          pl={theme.spacing(1)}
        >
          {translations["my_order"]} ({countMenuItems})
        </Text>
      </Flex>
      <Divider mb={theme.spacing(1)} ml={theme.spacing(1)} />
      <Flex
        height={1}
        width={1}
        direction="column"
        boxSizing="border-box"
        overflowY="auto"
        overflowX="hidden"
      >
        <Flex
          width={1}
          direction="column"
          pl={theme.spacing(1)}
          boxSizing="border-box"
        >
          <Flex
            boxSizing="border-box"
            pb={theme.spacing(1)}
            pr={theme.spacing(1)}
            width={1}
            alignItems="center"
          >
            <Flex>
              <Icon />
            </Flex>
            <Text fontSize={theme.fontSize(0)} pl={theme.spacing(1)} width={1}>
              {translations["count_of_persons"]}
            </Text>
            <Flex
              height={1}
              directio="row-reverse"
              width={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Flex>
                <Counter
                  reduceCount={changeNumberOfPeople(-1)}
                  enlargeCount={changeNumberOfPeople(+1)}
                  count={basketAtoms.personCount}
                />
              </Flex>
            </Flex>
          </Flex>
          <Divider />
        </Flex>
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
                        !!currentValue.modifiers.length
                      )}
                    />
                    <Text
                      fontSize={theme.fontSize(0)}
                      pl={theme.spacing(1)}
                      width={1}
                      onClick={expandItem(
                        currentValue._id,
                        !!currentValue.modifiers.length
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
                        reduceCount={changeOrderItemCount(-1, currentValue._id)}
                        enlargeCount={changeOrderItemCount(
                          +1,
                          currentValue._id
                        )}
                        count={currentValue.count}
                      />
                      {currentValue.modifiers.length &&
                      currentValue.modifiers.find(
                        (m) => m.isIncludedInOrder
                      ) ? (
                        <Flex
                          direction="column"
                          ml={theme.spacing(2)}
                          alignItems="center"
                        >
                          <Text>
                            {calculateSumOfModifiers(currentValue.modifiers)}$
                          </Text>
                          <Text>+</Text>
                          <Text>{currentValue.price}$</Text>
                        </Flex>
                      ) : (
                        <Text pl={theme.spacing(2)}>{currentValue.price}$</Text>
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
                      !!currentValue.modifiers.length
                    )}
                  />
                  <Text
                    fontSize={theme.fontSize(0)}
                    pl={theme.spacing(1)}
                    width={1}
                    onClick={expandItem(
                      currentValue._id,
                      !!currentValue.modifiers.length
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
                      reduceCount={changeOrderItemCount(-1, currentValue._id)}
                      enlargeCount={changeOrderItemCount(+1, currentValue._id)}
                      count={currentValue.count}
                    />
                    {currentValue.modifiers.length &&
                    currentValue.modifiers.find((m) => m.isIncludedInOrder) ? (
                      <Flex
                        direction="column"
                        ml={theme.spacing(2)}
                        alignItems="center"
                      >
                        <Text>
                          {calculateSumOfModifiers(currentValue.modifiers)}$
                        </Text>
                        <Text>+</Text>
                        <Text>{currentValue.price}$</Text>
                      </Flex>
                    ) : (
                      <Text pl={theme.spacing(2)}>{currentValue.price}$</Text>
                    )}
                  </Flex>
                </Flex>
              )}
            </SwipeDelete>
            {unfoldedItemId === currentValue._id &&
              !!currentValue.modifiers.length && (
                <Flex
                  px={theme.spacing(1)}
                  mb={theme.spacing(1)}
                  width={1}
                  direction="column"
                  boxSizing="border-box"
                >
                  <Text color="var(--text-grey)">
                    {translations["extra_add_ons"]}
                  </Text>
                  {currentValue.modifiers.map((currentModifiers) => (
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
                                currentValue._id
                              )}
                            />
                          ) : (
                            <GraySquareIcon
                              onClick={addModifierToAtom(
                                currentModifiers._id,
                                currentValue._id
                              )}
                            />
                          )}
                        </Flex>
                        <Text color="var(--light-grey)">
                          {currentModifiers.name}
                        </Text>
                      </Flex>
                      <Text color="var(--main-color)">
                        {currentModifiers.price}$
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              )}
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
      </Flex>
      <Flex
        direction="column"
        height={1}
        justifyContent="flex-end"
        width={1}
        alignItems="center"
        flex={1}
        boxSizing="border-box"
        pt={theme.spacing(2)}
        p={theme.spacing(1)}
      >
        <Button onClick={submitOrder} width={1} disabled={isDisable}>
          {`${translations["confirm_order"]} (${totalCost + "$"})`}
        </Button>
      </Flex>
    </Flex>
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

export default memo(Basket);
