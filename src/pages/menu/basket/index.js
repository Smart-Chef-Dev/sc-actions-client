import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import { Divider } from "components/divider";
import Button from "components/button";
import SwipeDelete from "./components/swipe-delete";

import { useTranslation } from "contexts/translation-context";
import { theme } from "theme";
import { Routes } from "constants/routes";

import productsInBasketState from "atoms/basket";
import personCountState from "atoms/personCount";

import Icon from "assets/icons/basket/icon.svg";
import BasketIcon from "assets/icons/basket/basket-icon.svg";

const Basket = () => {
  const [productsInBasketAtoms, setProductsInBasketAtoms] = useRecoilState(
    productsInBasketState
  );
  const [personCountAtoms, setPersonCountAtoms] = useRecoilState(
    personCountState
  );

  const [preRemoveItemId, setPreRemoveItemId] = useState(null);
  const [isDisable, setIsDisable] = useState(!productsInBasketAtoms.length);

  const [, setLocation] = useLocation();
  const [, { restaurantId, tableId }] = useRoute(Routes.BASKET);

  const {
    strings: { basket: translations },
  } = useTranslation();

  // should only be called when the page is refreshed
  useEffect(() => {
    if (
      productsInBasketAtoms.length &&
      productsInBasketAtoms[0].restaurantId !== restaurantId
    ) {
      setProductsInBasketAtoms([]);
    }

    // eslint-disable-next-line
  }, []);

  const totalCost = useMemo(() => {
    return productsInBasketAtoms
      .reduce(
        (previousValues, currentValue) =>
          previousValues + currentValue.price * currentValue.count,
        0
      )
      .toFixed(1);
  }, [productsInBasketAtoms]);

  const numberMenuItems = useMemo(() => {
    return productsInBasketAtoms.reduce(
      (previousValues, currentValue) => previousValues + +currentValue.count,
      0
    );
  }, [productsInBasketAtoms]);

  const changeTheNumberOfServings = useCallback(
    (diff, productId) => () => {
      const product = productsInBasketAtoms.find(
        (currentValue) => currentValue.productId === productId
      );

      if (product.count + diff <= 0) {
        return;
      }

      setProductsInBasketAtoms((oldProduct) =>
        oldProduct.map((currentValue) =>
          currentValue.productId === productId
            ? {
                ...currentValue,
                count: currentValue.count + diff,
              }
            : currentValue
        )
      );
    },
    [productsInBasketAtoms, setProductsInBasketAtoms]
  );

  const changeTheNumberOfPeople = useCallback(
    (changesTo) => () => {
      if (personCountAtoms + changesTo >= 1)
        setPersonCountAtoms(personCountAtoms + changesTo);
    },
    [personCountAtoms, setPersonCountAtoms]
  );

  const removeComponent = useCallback(() => {
    setProductsInBasketAtoms((oldProduct) =>
      oldProduct.filter(
        (currentValue) => currentValue.productId !== preRemoveItemId
      )
    );
  }, [setProductsInBasketAtoms, preRemoveItemId]);

  const sendAnOrder = useCallback(() => {
    fetch(`/api/message/${restaurantId}/${tableId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        { personCount: personCountAtoms },
        ...productsInBasketAtoms,
      ]),
    }).finally(() => {
      setProductsInBasketAtoms([]);
      setPersonCountAtoms(1);
      setLocation(`/restaurant/${restaurantId}/${tableId}`);
    });

    setIsDisable(true);
  }, [
    productsInBasketAtoms,
    setProductsInBasketAtoms,
    restaurantId,
    tableId,
    personCountAtoms,
    setLocation,
    setPersonCountAtoms,
    setIsDisable,
  ]);

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
          {translations["my_order"]} ({numberMenuItems})
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
              <Text
                fontSize={theme.fontSize(3)}
                pr={theme.spacing(1)}
                color="var(--main-color)"
                onClick={changeTheNumberOfPeople(-1)}
              >
                -
              </Text>
              <Text fontSize={theme.fontSize(3)}>{personCountAtoms}</Text>
              <Text
                fontSize={theme.fontSize(3)}
                pl={theme.spacing(1)}
                color="var(--main-color)"
                onClick={changeTheNumberOfPeople(+1)}
              >
                +
              </Text>
            </Flex>
          </Flex>
          <Divider />
        </Flex>
        {productsInBasketAtoms.map((currentValue) => (
          <Flex key={currentValue.productId} width={1} direction="column">
            <SwipeDelete
              itemId={currentValue.productId}
              onPreRemove={setPreRemoveItemId}
            >
              {preRemoveItemId === currentValue.productId ? (
                <Flex width={1} height={1} position="relative">
                  <s.RemoteComponent
                    p={theme.spacing(1)}
                    width={1}
                    alignItems="center"
                  >
                    <s.Preview
                      src={currentValue.pictureUrl}
                      alt={currentValue.name}
                    />
                    <Text
                      fontSize={theme.fontSize(0)}
                      pl={theme.spacing(1)}
                      width={1}
                    >
                      {currentValue.name}
                    </Text>
                    <Flex
                      directio="row-reverse"
                      width={1}
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Flex height={1}>
                        <Text
                          fontSize={theme.fontSize(3)}
                          pr={theme.spacing(1)}
                          color="var(--main-color)"
                          onClick={changeTheNumberOfServings(
                            -1,
                            currentValue.productId
                          )}
                        >
                          -
                        </Text>
                        <Text fontSize={theme.fontSize(3)}>
                          {currentValue.count}
                        </Text>
                        <Text
                          fontSize={theme.fontSize(3)}
                          pl={theme.spacing(1)}
                          color="var(--main-color)"
                          onClick={changeTheNumberOfServings(
                            +1,
                            currentValue.productId
                          )}
                        >
                          +
                        </Text>
                      </Flex>
                      <Text pl={theme.spacing(2)}>{currentValue.price}$</Text>
                    </Flex>
                  </s.RemoteComponent>
                  <s.DeleteButton
                    alignItems="center"
                    justifyContent="center"
                    onClick={removeComponent}
                  >
                    <BasketIcon />
                  </s.DeleteButton>
                </Flex>
              ) : (
                <Flex p={theme.spacing(1)} width={1} alignItems="center">
                  <s.Preview
                    src={currentValue.pictureUrl}
                    alt={currentValue.name}
                  />
                  <Text
                    fontSize={theme.fontSize(0)}
                    pl={theme.spacing(1)}
                    width={1}
                  >
                    {currentValue.name}
                  </Text>
                  <Flex
                    directio="row-reverse"
                    width={1}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Flex height={1}>
                      <Text
                        fontSize={theme.fontSize(3)}
                        pr={theme.spacing(1)}
                        color="var(--main-color)"
                        onClick={changeTheNumberOfServings(
                          -1,
                          currentValue.productId
                        )}
                      >
                        -
                      </Text>
                      <Text fontSize={theme.fontSize(3)}>
                        {currentValue.count}
                      </Text>
                      <Text
                        fontSize={theme.fontSize(3)}
                        pl={theme.spacing(1)}
                        color="var(--main-color)"
                        onClick={changeTheNumberOfServings(
                          +1,
                          currentValue.productId
                        )}
                      >
                        +
                      </Text>
                    </Flex>
                    <Text pl={theme.spacing(2)}>{currentValue.price}$</Text>
                  </Flex>
                </Flex>
              )}
            </SwipeDelete>
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
        <Button onClick={sendAnOrder} width={1} disabled={isDisable}>
          {`${translations["confirm_order"]} (${totalCost + "$"})`}
        </Button>
      </Flex>
    </Flex>
  );
};

const s = {
  Preview: styled(Img)`
    height: 51px;
    width: 51px;
    object-fit: cover;
    border-radius: 16px;
  `,
  DeleteButton: styled(Flex)`
    width: 58px;
    height: 83px;

    background: var(--main-color);

    position: absolute;
    right: 0;
  `,
  RemoteComponent: styled(Flex)`
    background: var(--highlighted-item);

    position: relative;
    right: 58px;
  `,
};

export default memo(Basket);
