import { memo, useCallback, useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useRecoilState } from "recoil";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import { Divider } from "components/divider";
import Navigation from "./components/navigation";

import { useTranslation } from "contexts/translation-context";
import { theme } from "theme";

import Arrow from "./arrow.svg";
import Basket from "./basket.svg";

import productsInBasketState from "atoms/basket";

const ExpandedMenu = () => {
  const [match, { restaurantId, categoryId, tableId }] = useRoute(
    Routes.EXPANDED_MENU
  );
  const [, setLocation] = useLocation();

  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  const [error, setError] = useState(false);

  const [productsInBasketAtoms, setProductsInBasketAtoms] = useRecoilState(
    productsInBasketState
  );

  const {
    strings: { expandedMenu: translations },
  } = useTranslation();

  useEffect(() => {
    fetch(`/api/category/${restaurantId}/`, {
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
        setCategory(result);
      });

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
    if (match && !error) {
      setCurrentList(
        course.filter(
          (currentValue) => currentValue.category._id === categoryId
        )
      );
    }
  }, [course, error, match, categoryId]);

  const arrowClicking = useCallback(() => {
    if (match) {
      setLocation(`/restaurant/${restaurantId}/${tableId}`);
    }
  }, [setLocation, restaurantId, tableId, match]);

  const pressingItems = useCallback(
    (itemId) => () => {
      if (match) {
        setLocation(`/restaurant/${restaurantId}/${tableId}/item/${itemId}`);
      }
    },
    [setLocation, restaurantId, tableId, match]
  );

  const addProductToOrder = useCallback(
    (id, name, pictureUrl, price) => () => {
      for (let i = 0; i < productsInBasketAtoms.length; i++) {
        if (productsInBasketAtoms[i].productId === id) {
          return;
        }
      }
      setProductsInBasketAtoms([
        ...productsInBasketAtoms,
        {
          productId: id,
          name: name,
          pictureUrl: pictureUrl,
          price: price,
          count: 1,
          restaurantId: restaurantId,
        },
      ]);
    },
    [setProductsInBasketAtoms, productsInBasketAtoms, restaurantId]
  );

  return (
    <Flex direction="column" height={1} width={1}>
      <s.Arrow alignItems="center">
        <Arrow onClick={arrowClicking} />
        <Text
          color="var(--text-grey)"
          fontFamily="SF UI Display"
          fontSize={theme.fontSize(2)}
        >
          {translations["menu"]}
        </Text>
      </s.Arrow>
      {match && !error && currentList[0] && (
        <Flex direction="column" height={1} width={1}>
          <Flex
            direction="column"
            pl={theme.spacing(1)}
            width={1}
            flex={1}
            height={1}
            boxSizing="border-box"
          >
            <Text
              fontFamily="SF UI Display"
              fontSize={theme.fontSize(3)}
              mt={theme.spacing(3)}
              mb={theme.spacing(1)}
              fontWeight="bold"
            >
              {currentList[0].category.name}
            </Text>
            <Divider />
            <Navigation category={category} currentCategory={categoryId} />
          </Flex>
          <Flex
            boxSizing="border-box"
            pr={theme.spacing(1)}
            pl={theme.spacing(1)}
            overflowY="scroll"
            width={1}
            height={1}
          >
            <Flex direction="column" width={1} height={1}>
              {currentList.map((currentValue) => (
                <s.Container
                  key={currentValue._id}
                  mb={theme.spacing(1)}
                  width={1}
                >
                  <s.IconBasket
                    onClick={addProductToOrder(
                      currentValue._id,
                      currentValue.name,
                      currentValue.pictureUrl,
                      currentValue.price
                    )}
                  >
                    <Basket />
                  </s.IconBasket>
                  <Flex
                    direction="column"
                    height={1}
                    width={1}
                    onClick={pressingItems(currentValue._id)}
                  >
                    <s.Preview
                      src={currentValue.pictureUrl}
                      alt={currentValue.name}
                      borderRadius="12px 12px 0 0"
                      width={1}
                    />
                    <Text
                      p={theme.spacing(1)}
                      color="var(--text-grey)"
                      fontFamily="SF UI Display"
                      textTransform="uppercase"
                    >
                      {currentValue.category.name}
                    </Text>
                    <Text
                      fontFamily="Actor"
                      pl={theme.spacing(1)}
                      fontSize={theme.fontSize(1)}
                    >
                      {currentValue.name}
                    </Text>
                    <Flex width={1}>
                      <Text
                        alignItems="center"
                        pl={theme.spacing(1)}
                        height={1}
                        width={1}
                        color="var(--text-grey)"
                        font-family="SF UI Display"
                        fontSize={theme.fontSize(0)}
                      >
                        {`${currentValue.weight} ${translations["g"]}`}
                      </Text>
                      <Flex direction="row-reverse" width={1}>
                        <Text
                          m={theme.spacing(1)}
                          fontSize={theme.fontSize(2)}
                          fontWeight="bold"
                        >
                          {currentValue.price}$
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </s.Container>
              ))}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
const s = {
  Container: styled(Flex)`
    position: relative;

    box-shadow: 0 5px 15px var(--shadow);
    border-radius: 16px;
  `,
  Arrow: styled(Flex)`
    position: absolute;
    left: 8px;
    top: 12px;
  `,
  Preview: styled(Img)`
    max-height: 300px;
    object-fit: cover;
  `,
  IconBasket: styled(Flex)`
    position: absolute;
    right: 16px;
    top: 16px;
  `,
};
export default memo(ExpandedMenu);