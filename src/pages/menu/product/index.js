import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Label } from "components/label";
import { Text } from "components/text";
import Button from "components/button";

import { Routes } from "constants/routes";

import { theme } from "theme";

import Arrow from "./Arrow.png";

import productsInBasketState from "atoms/basket";

import { useRecoilState } from "recoil";

const Product = () => {
  const [match, params] = useRoute(Routes.PRODUCT);
  const [course, setCourse] = useState([]);
  const [count, setcount] = useState(1);
  const [currentItem, setCurrentItem] = useState();
  const [alreadyInTheCart, setAlreadyInTheCart] = useState(false);
  const [indexCourses, setIndexCourses] = useState(-1);
  const [, setLocation] = useLocation();
  const [error, setError] = useState(false);

  const [productsInBasket, setProductsInBasket] = useRecoilState(
    productsInBasketState
  );

  useEffect(() => {
    fetch("/api/menu/" + params.restaurant + "/getCourse", {
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
  }, [params.restaurant]);

  useEffect(() => {
    if (!error) {
      setCurrentItem(
        course.find((currentValue) => currentValue._id === params.itemId)
      );
    }
  }, [course, params, error]);

  useEffect(() => {
    if (currentItem) {
      for (let i = 0; i < productsInBasket.length; i++) {
        if (productsInBasket[i].productId === currentItem._id) {
          setAlreadyInTheCart(true);
          setIndexCourses(i);
          setcount(productsInBasket[i].count);
          break;
        }
      }
    }
  }, [currentItem, productsInBasket]);

  const reducePortion = useCallback(() => {
    if (alreadyInTheCart && count > 1) {
      productsInBasket[indexCourses].count--;

      setProductsInBasket([...productsInBasket]);
    } else if (count > 1) {
      setcount(count - 1);
    }
  }, [
    count,
    indexCourses,
    productsInBasket,
    alreadyInTheCart,
    setProductsInBasket,
  ]);

  const increasePortion = useCallback(() => {
    if (alreadyInTheCart) {
      productsInBasket[indexCourses].count++;

      setProductsInBasket([...productsInBasket]);
    } else {
      setcount(count + 1);
    }
  }, [
    count,
    indexCourses,
    productsInBasket,
    alreadyInTheCart,
    setProductsInBasket,
  ]);

  const arrowClicking = useCallback(() => {
    if (match) {
      setLocation(`/restaurant/${params.restaurant}/${params.tableId}`);
    }
  }, [setLocation, params.restaurant, params.tableId, match]);

  const addProductToOrder = useCallback(() => {
    setProductsInBasket([
      ...productsInBasket,
      {
        productId: currentItem._id,
        name: currentItem.name,
        picture: currentItem.picture,
        price: currentItem.price,
        count: count,
        restaurant: currentItem.category.restaurant,
      },
    ]);
  }, [currentItem, count, setProductsInBasket, productsInBasket]);

  return (
    <Flex height={1}>
      {match && !error && currentItem && (
        <Flex direction="column" height={1} width={1}>
          <s.Arrow src={Arrow} alt="Arrow" onClick={arrowClicking} />
          <Flex width={1} height={1} flex={1}>
            <Img src={currentItem.picture} alt={currentItem.name} width={1} />
          </Flex>
          <s.MainInformation
            direction="column"
            p={theme.spacing(1)}
            height={1}
            width={1}
            boxSizing="border-box"
          >
            <s.Time>
              <Label>{"~ " + currentItem.time}</Label>
            </s.Time>
            <Text
              color="var(--text-grey)"
              fontFamily="SF UI Display"
              textTransform="uppercase"
              pb={theme.spacing(1)}
            >
              {currentItem.category.category}
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
                {"Weight:" + currentItem.weight}
              </Text>
              <Text fontFamily="SF UI Display" color="#4cd964" fontSize="2rem">
                {currentItem.price}
              </Text>
            </Flex>
            <Text color="#999999">{currentItem.description}</Text>
            <Flex width={1} flex={1} direction="column-reverse">
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
                  <Text
                    fontSize={theme.fontSize(3)}
                    mb={theme.spacing(1)}
                    fontFamily="SF UI Display"
                  >
                    already in the cart
                  </Text>
                ) : (
                  <Button onClick={addProductToOrder}>ORDER</Button>
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
  Arrow: styled(Img)`
    position: absolute;
    left: 20px;
    top: 20px;
  `,
};
export default memo(Product);
