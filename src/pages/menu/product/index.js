import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useRecoilState } from "recoil";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import Button from "components/button";
import Counter from "components/counter";

import { useTranslation } from "contexts/translation-context";
import { Routes } from "constants/routes";
import { theme } from "theme";

import Arrow from "assets/icons/product/arrow.svg";

import BasketState from "atoms/basket";
import {formatCurrency} from 'utils/formatCurrency'

const Product = () => {
  const [, { restaurantId, itemId, tableId }] = useRoute(Routes.PRODUCT);
  const [, setLocation] = useLocation();

  const [menuItem, setMenuItem] = useState({});
  const [count, setCount] = useState(1);

  const [isError, setIsError] = useState(false);

  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const {
    strings: { product: translations },
  } = useTranslation();

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/menu/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsError(!response.ok);
        return;
      }

      return setMenuItem(await response.json());
    }

    getData();
  }, [restaurantId, itemId]);

  const inTheBasket = useMemo(() => {
    return !!basketAtoms.order.find(
      (currentValue) => currentValue._id === itemId
    );
  }, [itemId, basketAtoms]);

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

      setBasketAtoms((oldOrder) => {
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
    [setBasketAtoms, countInBasket, itemId]
  );

  const handleArrowClick = useCallback(() => {
    setLocation(`/restaurant/${restaurantId}/${tableId}`);
  }, [setLocation, restaurantId, tableId]);

  const addProductToOrder = useCallback(() => {
    setBasketAtoms((oldBasket) => {
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
  }, [menuItem, count, setBasketAtoms]);

  return (
    <Flex height={1} width={1} overflowY="auto" overflowX="hidden">
      {!isError && !!menuItem._id && (
        <Flex direction="column" height={1} width={1}>
          <s.Arrow>
            <Arrow onClick={handleArrowClick} />
          </s.Arrow>
          <Flex width={1} height={0.5} flex={1}>
            <s.Photo src={menuItem.pictureUrl} alt={menuItem.name} width={1} />
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
              <Text color="var(--light-grey)" height={1} alignItems="center">
                {`${translations["weight"]} ${menuItem.weight} ${translations["g"]}`}
              </Text>
              <Text color="#4cd964" fontSize="2rem">
                {formatCurrency(menuItem.category.restaurant.currencyCode, menuItem.price)}
              </Text>
            </Flex>
            <Text color="var(--light-grey)">{menuItem.description}</Text>
            <Flex
              width={1}
              flex={1}
              direction="column-reverse"
              mt={theme.spacing(1)}
            >
              <Flex
                width={1}
                justifyContent="space-between"
                mb={theme.spacing(1)}
              >
                <Counter
                  reduceCount={
                    inTheBasket ? changeOrderItemCount(-1) : changeCount(-1)
                  }
                  enlargeCount={
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
  Photo: styled(Img)`
    max-height: 300px;
    object-fit: cover;
  `,
};
export default memo(Product);
