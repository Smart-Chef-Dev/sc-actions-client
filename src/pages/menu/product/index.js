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

import Arrow from "assets/icons/product/arrow.svg";

import BasketState from "atoms/basket";

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

  const inTheBasket = useMemo(() => {
    return !!basketAtoms.order.find((currentValue) => {
      if (currentValue._id === itemId) return currentValue._id;
    });
  }, [itemId, basketAtoms]);

  const valueInBasket = useMemo(() => {
    return basketAtoms.order.find((currentValue) => {
      if (currentValue._id === itemId) {
        return {
          count: currentValue.count,
        };
      }
    });
  }, [itemId, basketAtoms]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/menu/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsError(!response.ok);

      return setMenuItem(await response.json());
    }

    getData();
  }, [restaurantId, itemId]);

  const changeTheNumberOfServings = useCallback(
    (diff) => () => {
      if (inTheBasket && valueInBasket.count + diff <= 0) {
        return;
      }

      if (!inTheBasket && count + diff <= 0) {
        return;
      }

      if (inTheBasket) {
        setBasketAtoms((oldProducts) => {
          return {
            ...oldProducts,
            order: oldProducts.order.map((currentValue) =>
              currentValue._id === itemId
                ? {
                    ...currentValue,
                    count: currentValue.count + diff,
                  }
                : currentValue
            ),
          };
        });
      } else {
        setCount(count + diff);
      }
    },
    [count, setBasketAtoms, valueInBasket, itemId, inTheBasket]
  );

  const arrowClicking = useCallback(() => {
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
