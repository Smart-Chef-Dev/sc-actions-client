import { memo, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import { Divider } from "components/divider";
import Navigation from "./components/navigation";

import { useTranslation } from "contexts/translation-context";
import { theme } from "theme";

import Arrow from "assets/icons/expanded-menu/arrow.svg";
import Basket from "assets/icons/expanded-menu/basket.svg";

import BasketState from "atoms/basket";

const ExpandedMenu = () => {
  const [, { restaurantId, categoryId, tableId }] = useRoute(
    Routes.EXPANDED_MENU
  );
  const [, setLocation] = useLocation();

  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const {
    strings: { expandedMenu: translations },
  } = useTranslation();

  const category = useQuery("category", () =>
    fetch(`/api/restaurant/${restaurantId}/category`).then((res) => res.json())
  );
  const menuItems = useQuery("menuItems", () =>
    fetch(`/api/category/${categoryId}/menu-item`).then((res) => res.json())
  );

  const handleArrowClick = useCallback(() => {
    setLocation(`/restaurant/${restaurantId}/${tableId}`);
  }, [setLocation, restaurantId, tableId]);

  const handleItemClick = useCallback(
    (itemId) => () => {
      setLocation(`/restaurant/${restaurantId}/${tableId}/item/${itemId}`);
    },
    [setLocation, restaurantId, tableId]
  );

  const addProductToOrder = useCallback(
    (product) => () => {
      const isInTheBasket = !!basketAtoms.order.find(
        (currentValue) => currentValue._id === product._id
      );

      if (isInTheBasket) {
        return;
      }

      setBasketAtoms((oldOrder) => {
        return {
          ...oldOrder,
          order: [
            ...oldOrder.order,
            {
              ...product,
              count: 1,
            },
          ],
        };
      });
    },
    [setBasketAtoms, basketAtoms]
  );

  return (
    <Flex direction="column" height={1} width={1}>
      <s.Arrow alignItems="center" onClick={handleArrowClick}>
        <Arrow />
        <Text color="var(--text-grey)" fontSize={theme.fontSize(2)}>
          {translations["menu"]}
        </Text>
      </s.Arrow>
      {!category.isError &&
        !menuItems.isError &&
        !category.isLoading &&
        !menuItems.isLoading && (
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
                fontSize={theme.fontSize(3)}
                mt={theme.spacing(3)}
                mb={theme.spacing(1)}
                fontWeight="bold"
              >
                {menuItems.data[0].category.name}
              </Text>
              <Divider />
              <Navigation
                category={category.data}
                currentCategory={categoryId}
              />
            </Flex>
            <Flex
              boxSizing="border-box"
              px={theme.spacing(1)}
              overflowY="auto"
              width={1}
              height={1}
            >
              <Flex direction="column" width={1} height={1}>
                {menuItems.data.map((currentValue) => (
                  <s.Container
                    key={currentValue._id}
                    mb={theme.spacing(1)}
                    width={1}
                  >
                    <s.IconBasket onClick={addProductToOrder(currentValue)}>
                      <Basket />
                    </s.IconBasket>
                    <Flex
                      direction="column"
                      height={1}
                      width={1}
                      onClick={handleItemClick(currentValue._id)}
                    >
                      <Img
                        src={currentValue.pictureUrl}
                        alt={currentValue.name}
                        borderRadius="12px 12px 0 0"
                        width={1}
                        height={1}
                      />
                      <Text
                        p={theme.spacing(1)}
                        color="var(--text-grey)"
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

    box-shadow: 0 5px 15px var(--box-shadow);
    border-radius: 16px;
  `,
  Arrow: styled(Flex)`
    position: absolute;
    left: 8px;
    top: 12px;
  `,
  IconBasket: styled(Flex)`
    position: absolute;
    right: 16px;
    top: 16px;
  `,
};
export default memo(ExpandedMenu);
