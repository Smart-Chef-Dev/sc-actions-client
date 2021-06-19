import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useRecoilState } from "recoil";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import Button from "components/button";

import { useTranslation } from "contexts/translation-context";
import { Routes } from "constants/routes";
import { theme } from "theme";

import Arrow from "../../../assets/icons/product/arrow.svg";

import productsInBasketState from "atoms/basket";

const Product = () => {
  const [, { restaurantId, itemId, tableId }] = useRoute(Routes.PRODUCT);
  const [, setLocation] = useLocation();

  const [menuItems, setMenuItems] = useState([]);
  const [count, setCount] = useState(0);

  const [error, setError] = useState(false);

  const [productsInBasketAtoms, setProductsInBasketAtoms] = useRecoilState(
    productsInBasketState
  );

  const {
    strings: { product: translations },
  } = useTranslation();

  const currentMenuItem = useMemo(() => {
    if (!error) {
      return menuItems.find((currentValue) => currentValue._id === itemId);
    }
  }, [menuItems, itemId, error]);

  const currentMenuItemInfo = useMemo(() => {
    let alreadyInTheBasket = false;
    let indexInBasketAtom = null;
    let count = null;

    if (currentMenuItem) {
      for (let i = 0; i < productsInBasketAtoms.length; i++) {
        if (productsInBasketAtoms[i].productId === currentMenuItem._id) {
          alreadyInTheBasket = true;
          indexInBasketAtom = i;
          count = productsInBasketAtoms[i].count;
          break;
        }
      }
    }

    return {
      alreadyInTheBasket: alreadyInTheBasket,
      indexInBasketAtom: indexInBasketAtom,
      count: count,
    };
  }, [currentMenuItem, productsInBasketAtoms]);

  useEffect(() => {
    fetch(`/api/menu/${restaurantId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setError(!response.ok);
        return response.json();
      })
      .then((result) => {
        setMenuItems(result);
      });
  }, [restaurantId]);

  const reducePortion = useCallback(() => {
    if (
      currentMenuItemInfo.alreadyInTheBasket &&
      currentMenuItemInfo.count > 1
    ) {
      setProductsInBasketAtoms(
        productsInBasketAtoms.map((currentValue, index) => {
          if (index === currentMenuItemInfo.indexInBasketAtom) {
            return {
              count: currentValue.count - 1,
              productId: currentValue.productId,
              restaurantId: currentValue.restaurantId,
              pictureUrl: currentValue.pictureUrl,
              price: currentValue.price,
              name: currentValue.name,
            };
          }

          return currentValue;
        })
      );
    } else if (count > 1) {
      setCount(count - 1);
    }
  }, [
    count,
    productsInBasketAtoms,
    setProductsInBasketAtoms,
    currentMenuItemInfo,
  ]);

  const increasePortion = useCallback(() => {
    if (currentMenuItemInfo.alreadyInTheBasket) {
      setProductsInBasketAtoms(
        productsInBasketAtoms.map((currentValue, index) => {
          if (index === currentMenuItemInfo.indexInBasketAtom) {
            return {
              count: currentValue.count + 1,
              productId: currentValue.productId,
              restaurantId: currentValue.restaurantId,
              pictureUrl: currentValue.pictureUrl,
              price: currentValue.price,
              name: currentValue.name,
            };
          }

          return currentValue;
        })
      );
    } else {
      setCount(count + 1);
    }
  }, [
    count,
    productsInBasketAtoms,
    setProductsInBasketAtoms,
    currentMenuItemInfo.alreadyInTheBasket,
    currentMenuItemInfo.indexInBasketAtom,
  ]);

  const arrowClicking = useCallback(() => {
    setLocation(`/restaurant/${restaurantId}/${tableId}`);
  }, [setLocation, restaurantId, tableId]);

  const addProductToOrder = useCallback(() => {
    setProductsInBasketAtoms([
      ...productsInBasketAtoms,
      {
        productId: currentMenuItem._id,
        name: currentMenuItem.name,
        pictureUrl: currentMenuItem.pictureUrl,
        price: currentMenuItem.price,
        count: count,
        restaurantId: currentMenuItem.category.restaurant._id,
      },
    ]);
  }, [currentMenuItem, count, setProductsInBasketAtoms, productsInBasketAtoms]);

  return (
    <Flex height={1} width={1} overflowY="auto" overflowX="hidden">
      {!error && currentMenuItem && (
        <Flex direction="column" height={1} width={1}>
          <s.Arrow>
            <Arrow onClick={arrowClicking} />
          </s.Arrow>
          <Flex width={1} height={1} flex={1}>
            <Img
              src={currentMenuItem.pictureUrl}
              alt={currentMenuItem.name}
              width={1}
            />
          </Flex>
          <s.MainInformation
            direction="column"
            p={theme.spacing(1)}
            height={1}
            width={1}
            boxSizing="border-box"
          >
            <s.Time>
              <Text>{`~ ${currentMenuItem.time} ${translations["min"]}`}</Text>
            </s.Time>
            <Text
              color="var(--text-grey)"
              textTransform="uppercase"
              pb={theme.spacing(1)}
            >
              {currentMenuItem.category.name}
            </Text>
            <Text fontSize={theme.fontSize(3)} pb={theme.spacing(1)}>
              {currentMenuItem.name}
            </Text>
            <Flex
              justifyContent="space-between"
              width={1}
              pb={theme.spacing(1)}
            >
              <Text color="var(--bright-grey)" height={1} alignItems="center">
                {`${translations["weight"]} ${currentMenuItem.weight} ${translations["g"]}`}
              </Text>
              <Text color="#4cd964" fontSize="2rem">
                {currentMenuItem.price}$
              </Text>
            </Flex>
            <Text color="var(--bright-grey)">
              {currentMenuItem.description}
            </Text>
            <Flex
              width={1}
              flex={1}
              direction="column-reverse"
              mt={theme.spacing(1)}
            >
              <Flex width={1} justifyContent="space-between">
                <Flex height={1} alignItems="center">
                  <Text
                    fontSize={theme.fontSize(3)}
                    color="var(--main-color)"
                    onClick={reducePortion}
                    mb={theme.spacing(1)}
                  >
                    -
                  </Text>
                  <Text
                    fontSize={theme.fontSize(3)}
                    px={theme.spacing(1)}
                    mb={theme.spacing(1)}
                  >
                    {currentMenuItemInfo.alreadyInTheBasket
                      ? currentMenuItemInfo.count
                      : count}
                  </Text>
                  <Text
                    fontSize={theme.fontSize(3)}
                    color="var(--main-color)"
                    onClick={increasePortion}
                    mb={theme.spacing(1)}
                  >
                    +
                  </Text>
                </Flex>
                {currentMenuItemInfo.alreadyInTheBasket ? (
                  <Button disabled={true}>
                    {translations["already_in_the_basket"]}
                  </Button>
                ) : (
                  <Button onClick={addProductToOrder}>
                    {translations["order"]}
                  </Button>
                )}
              </Flex>
            </Flex>
          </s.MainInformation>
        </Flex>
      )}
    </Flex>
  );
};

const s = {
  MainInformation: styled(Flex)`
    background: var(--main-bg-color);
    border-radius: 16px 16px 0 0;
    position: relative;
    bottom: 16px;
    padding-bottom: 0;
  `,
  Time: styled(Flex)`
    position: absolute;
    right: 16px;
    top: -16px;

    background: var(--main-bg-color);
    padding: 8px;
    border-radius: 16px;
  `,
  Arrow: styled(Flex)`
    position: absolute;
    left: 20px;
    top: 20px;
  `,
};
export default memo(Product);
