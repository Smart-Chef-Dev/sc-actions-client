import { memo, useCallback, useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import Button from "components/button";
import Counter from "components/counter";
import Loader from "components/loaders";

import { useTranslation } from "contexts/translation-context";
import { Routes } from "constants/routes";
import { theme } from "theme";

import Arrow from "assets/icons/product/arrow.svg";

import BasketState from "atoms/basket";

import getMenuItemsById from "services/getMenuItemsById";

const Product = () => {
  const [, { restaurantId, itemId, tableId }] = useRoute(Routes.PRODUCT);
  const [, setLocation] = useLocation();

  const [count, setCount] = useState(1);

  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const {
    strings: { product: translations },
  } = useTranslation();

  const { data, isError, isLoading } = useQuery(
    ["menuItem", { itemId }],
    getMenuItemsById
  );

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

  const removeOrder = useCallback(() => {
    setBasketAtoms((oldOrder) => {
      return {
        ...oldOrder,
        order: oldOrder.order.filter(
          (currentValue) => currentValue._id !== itemId
        ),
      };
    });
  }, [itemId, setBasketAtoms]);

  const changeOrderItemCount = useCallback(
    (diff) => () => {
      if (countInBasket + diff <= 0) {
        return removeOrder();
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
    [setBasketAtoms, countInBasket, itemId, removeOrder]
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
            ...data,
            count: count,
          },
        ],
      };
    });
  }, [data, count, setBasketAtoms]);

  return !isLoading ? (
    <Flex height={1} width={1} overflowY="auto" overflowX="hidden">
      {!isError && (
        <Flex direction="column" height={1} width={1}>
          <s.Arrow>
            <Arrow onClick={handleArrowClick} />
          </s.Arrow>
          <Flex width={1} height={0.5} flex={1}>
            <s.Photo src={data.pictureUrl} alt={data.name} width={1} />
          </Flex>
          <s.MainInformation
            direction="column"
            p={theme.spacing(1)}
            height={1}
            width={1}
            boxSizing="border-box"
          >
            {data.time && (
              <s.Time>
                <Text>{`~ ${data.time} ${translations["min"]}`}</Text>
              </s.Time>
            )}
            <Text
              color="var(--text-grey)"
              textTransform="uppercase"
              pb={theme.spacing(1)}
            >
              {data.category.name}
            </Text>
            <Text fontSize={theme.fontSize(3)} pb={theme.spacing(1)}>
              {data.name}
            </Text>
            <Flex
              justifyContent="space-between"
              width={1}
              pb={theme.spacing(1)}
            >
              {data.weight && (
                <Text color="var(--light-grey)" height={1} alignItems="center">
                  {`${translations["weight"]} ${data.weight} ${translations["g"]}`}
                </Text>
              )}
              <Text color="#4cd964" fontSize="2rem">
                {data.price}$
              </Text>
            </Flex>
            <Text color="var(--light-grey)">{data.description}</Text>
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
  ) : (
    <Loader />
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
