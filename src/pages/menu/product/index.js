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

  const [menuItem, setMenuItem] = useState({});
  const [count, setCount] = useState(1);

  const [error, setError] = useState(false);

  const [productsInBasketAtoms, setProductsInBasketAtoms] = useRecoilState(
    productsInBasketState
  );

  const {
    strings: { product: translations },
  } = useTranslation();

  const inTheBasket = useMemo(() => {
    return !!productsInBasketAtoms.find(
      (currentValue) => currentValue.productId === itemId
    );
  }, [itemId, productsInBasketAtoms]);

  const valueInBasket = useMemo(() => {
    return productsInBasketAtoms.find((currentValue) => {
      if (currentValue.productId === itemId) {
        return {
          count: currentValue.count,
        };
      }
    });
  }, [itemId, productsInBasketAtoms]);

  useEffect(() => {
    fetch(`/api/menu/${itemId}`, {
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
        setMenuItem(result);
      });
  }, [restaurantId, itemId]);

  const changeTheNumberOfServings = useCallback(
    (changesTo) => () => {
      if (inTheBasket && valueInBasket.count + changesTo <= 0) {
        return;
      }

      if (!inTheBasket && count + changesTo <= 0) {
        return;
      }

      if (inTheBasket) {
        setProductsInBasketAtoms((oldProducts) =>
          oldProducts.map((currentValue) =>
            currentValue.productId === itemId
              ? {
                  ...currentValue,
                  count: currentValue.count + changesTo,
                }
              : currentValue
          )
        );
      } else {
        setCount(count + changesTo);
      }
    },
    [count, setProductsInBasketAtoms, valueInBasket, itemId, inTheBasket]
  );

  const arrowClicking = useCallback(() => {
    setLocation(`/restaurant/${restaurantId}/${tableId}`);
  }, [setLocation, restaurantId, tableId]);

  const addProductToOrder = useCallback(() => {
    setProductsInBasketAtoms((oldValue) => [
      ...oldValue,
      {
        productId: menuItem._id,
        name: menuItem.name,
        pictureUrl: menuItem.pictureUrl,
        price: menuItem.price,
        count: count,
        restaurantId: menuItem.category.restaurant._id,
      },
    ]);
  }, [menuItem, count, setProductsInBasketAtoms]);

  return (
    <Flex height={1} width={1} overflowY="auto" overflowX="hidden">
      {!error && !!menuItem._id && (
        <Flex direction="column" height={1} width={1}>
          <s.Arrow>
            <Arrow onClick={arrowClicking} />
          </s.Arrow>
          <Flex width={1} height={1} flex={1}>
            <Img src={menuItem.pictureUrl} alt={menuItem.name} width={1} />
          </Flex>
          <s.MainInformation
            direction="column"
            p={theme.spacing(1)}
            height={1}
            width={1}
            boxSizing="border-box"
          >
            <s.Time>
              <Text>{`~ ${menuItem.time} ${translations["min"]}`}</Text>
            </s.Time>
            <Text
              color="var(--text-grey)"
              textTransform="uppercase"
              pb={theme.spacing(1)}
            >
              {menuItem.category.name}
            </Text>
            <Text fontSize={theme.fontSize(3)} pb={theme.spacing(1)}>
              {menuItem.name}
            </Text>
            <Flex
              justifyContent="space-between"
              width={1}
              pb={theme.spacing(1)}
            >
              <Text color="var(--bright-grey)" height={1} alignItems="center">
                {`${translations["weight"]} ${menuItem.weight} ${translations["g"]}`}
              </Text>
              <Text color="#4cd964" fontSize="2rem">
                {menuItem.price}$
              </Text>
            </Flex>
            <Text color="var(--bright-grey)">{menuItem.description}</Text>
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
                    onClick={changeTheNumberOfServings(-1)}
                    mb={theme.spacing(1)}
                  >
                    -
                  </Text>
                  <Text
                    fontSize={theme.fontSize(3)}
                    px={theme.spacing(1)}
                    mb={theme.spacing(1)}
                  >
                    {inTheBasket ? valueInBasket.count : count}
                  </Text>
                  <Text
                    fontSize={theme.fontSize(3)}
                    color="var(--main-color)"
                    onClick={changeTheNumberOfServings(+1)}
                    mb={theme.spacing(1)}
                  >
                    +
                  </Text>
                </Flex>
                {inTheBasket ? (
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
