import { memo, useCallback, useEffect, useState } from "react";
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
  const [match, { restaurantId, itemId, tableId }] = useRoute(Routes.PRODUCT);
  const [, setLocation] = useLocation();

  const [course, setCourse] = useState([]);
  const [count, setCount] = useState(1);
  const [currentItem, setCurrentItem] = useState();

  const [indexProducts, setIndexProducts] = useState(-1);
  const [alreadyInTheCart, setAlreadyInTheCart] = useState(false);
  const [error, setError] = useState(false);

  const [productsInBasketAtoms, setProductsInBasketAtoms] = useRecoilState(
    productsInBasketState
  );

  const {
    strings: { product: translations },
  } = useTranslation();

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
        setCourse(result);
      });
  }, [restaurantId]);

  useEffect(() => {
    if (!error) {
      setCurrentItem(
        course.find((currentValue) => currentValue._id === itemId)
      );
    }
  }, [course, itemId, error]);

  useEffect(() => {
    if (currentItem) {
      for (let i = 0; i < productsInBasketAtoms.length; i++) {
        if (productsInBasketAtoms[i].productId === currentItem._id) {
          setAlreadyInTheCart(true);
          setIndexProducts(i);
          setCount(productsInBasketAtoms[i].count);
          break;
        }
      }
    }
  }, [currentItem, productsInBasketAtoms]);

  const reducePortion = useCallback(() => {
    if (alreadyInTheCart && count > 1) {
      setProductsInBasketAtoms(
        productsInBasketAtoms.map((currentValue, index) => {
          if (index === indexProducts) {
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
    indexProducts,
    productsInBasketAtoms,
    alreadyInTheCart,
    setProductsInBasketAtoms,
  ]);

  const increasePortion = useCallback(() => {
    if (alreadyInTheCart) {
      setProductsInBasketAtoms(
        productsInBasketAtoms.map((currentValue, index) => {
          if (index === indexProducts) {
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
    indexProducts,
    productsInBasketAtoms,
    alreadyInTheCart,
    setProductsInBasketAtoms,
  ]);

  const arrowClicking = useCallback(() => {
    if (match) {
      setLocation(`/restaurant/${restaurantId}/${tableId}`);
    }
  }, [setLocation, restaurantId, tableId, match]);

  const addProductToOrder = useCallback(() => {
    setProductsInBasketAtoms([
      ...productsInBasketAtoms,
      {
        productId: currentItem._id,
        name: currentItem.name,
        pictureUrl: currentItem.pictureUrl,
        price: currentItem.price,
        count: count,
        restaurantId: currentItem.category.restaurant._id,
      },
    ]);
  }, [currentItem, count, setProductsInBasketAtoms, productsInBasketAtoms]);

  return (
    <Flex height={1} width={1} overflowY="auto" overflowX="hidden">
      {match && !error && currentItem && (
        <Flex direction="column" height={1} width={1}>
          <s.Arrow>
            <Arrow onClick={arrowClicking} />
          </s.Arrow>
          <Flex width={1} height={1} flex={1}>
            <Img
              src={currentItem.pictureUrl}
              alt={currentItem.name}
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
              <Text>{`~ ${currentItem.time} ${translations["min"]}`}</Text>
            </s.Time>
            <Text
              color="var(--text-grey)"
              fontFamily="SF UI Display"
              textTransform="uppercase"
              pb={theme.spacing(1)}
            >
              {currentItem.category.name}
            </Text>
            <Text
              fontFamily="SF UI Display"
              fontSize={theme.fontSize(3)}
              pb={theme.spacing(1)}
            >
              {currentItem.name}
            </Text>
            <Flex
              justifyContent="space-between"
              width={1}
              pb={theme.spacing(1)}
            >
              <Text color="#999999" height={1} alignItems="center">
                {`${translations["weight"]} ${currentItem.weight} ${translations["g"]}`}
              </Text>
              <Text fontFamily="SF UI Display" color="#4cd964" fontSize="2rem">
                {currentItem.price}$
              </Text>
            </Flex>
            <Text color="#999999">{currentItem.description}</Text>
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
                    pl={theme.spacing(1)}
                    pr={theme.spacing(1)}
                    mb={theme.spacing(1)}
                  >
                    {count}
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
                {alreadyInTheCart ? (
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
