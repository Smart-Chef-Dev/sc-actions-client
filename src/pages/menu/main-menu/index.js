import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useRecoilState } from "recoil";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import { Divider } from "components/divider";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

import Arrow from "assets/icons/main-menu/arrow.svg";

import BasketState from "atoms/basket";

const Menu = () => {
  const [, { restaurantId, tableId }] = useRoute(Routes.MENU);
  const [, setLocation] = useLocation();

  const [category, setCategory] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [isError, setIsError] = useState(false);

  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const {
    strings: { mainMenu: translations },
  } = useTranslation();

  useEffect(() => {
    if (
      !!basketAtoms.order.length &&
      basketAtoms.order[0].category.restaurant._id !== restaurantId
    ) {
      setBasketAtoms((oldBasket) => {
        return {
          ...oldBasket,
          order: [],
        };
      });
    }
    // should only be called when the page is refreshed
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/restaurant/${restaurantId}/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsError(!response.ok);
        return;
      }

      return setCategory(await response.json());
    }

    getData();
  }, [restaurantId]);

  useEffect(() => {
    category.map(async (currentValue) => {
      const response = await fetch(
        `/api/category/${currentValue._id}/menu-item`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setIsError(!response.ok);
        return;
      }

      const body = await response.json();

      setMenuItems((oldMenu) => [...oldMenu, ...body]);
    });
  }, [restaurantId, category]);

  const handleArrowClick = useCallback(
    (categoryId) => () => {
      setLocation(`/restaurant/${restaurantId}/${tableId}/${categoryId}`);
    },
    [setLocation, restaurantId, tableId]
  );

  const handleItemClick = useCallback(
    (itemId) => () => {
      setLocation(`/restaurant/${restaurantId}/${tableId}/item/${itemId}`);
    },
    [setLocation, restaurantId, tableId]
  );

  return (
    <Flex
      direction="column"
      pl={theme.spacing(1)}
      pt={theme.spacing(1)}
      height={1}
      width={1}
      boxSizing="border-box"
    >
      <Text
        fontSize={theme.fontSize(3)}
        fontWeight="bold"
        mb={theme.spacing(1)}
      >
        {translations["menu"]}
      </Text>
      <Divider mb={theme.spacing(1)} />
      <Flex direction="column" overflowY="auto" overflowX="hidden" width={1}>
        {!isError &&
          category.map((currentCategory, indexCategories) => (
            <Flex key={currentCategory._id} direction="column" width={1}>
              <Flex width={1}>
                <Text fontSize={theme.fontSize(2)} fontWeight="bold">
                  {currentCategory.name}
                </Text>
                <Flex
                  width={1}
                  height={1}
                  flex="1"
                  mr={theme.spacing(1)}
                  direction="row-reverse"
                  alignItems="center"
                >
                  <Arrow onClick={handleArrowClick(currentCategory._id)} />
                </Flex>
              </Flex>
              <Flex
                boxSizing="border-box"
                pl={theme.spacing(1)}
                pt={theme.spacing(1)}
                width={1}
                height={1}
              >
                <Flex overflowX="auto">
                  {!!menuItems.length &&
                    menuItems.map(
                      (currentMenuItems) =>
                        currentMenuItems.category._id ===
                          currentCategory._id && (
                          <Flex
                            key={currentMenuItems._id}
                            pr={theme.spacing(1)}
                            pb={theme.spacing(1)}
                          >
                            <Flex direction="column">
                              <s.Preview
                                src={currentMenuItems.pictureUrl}
                                alt={currentMenuItems.name}
                                borderRadius="10%"
                                mb={theme.spacing(1)}
                                onClick={handleItemClick(currentMenuItems._id)}
                              />
                              <s.ProductName>
                                {currentMenuItems.name}
                              </s.ProductName>
                              <Text color="var(--text-grey)">
                                {currentMenuItems.price}$
                              </Text>
                            </Flex>
                          </Flex>
                        )
                    )}
                </Flex>
              </Flex>
              {indexCategories !== category.length - 1 && (
                <Divider ml={theme.spacing(1)} mb={theme.spacing(1)} />
              )}
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

const s = {
  Preview: styled(Img)`
    max-width: 135px;
    min-height: 105px;

    object-fit: cover;
  `,
  ProductName: styled(Text)`
    max-width: 130px;
  `,
};

export default memo(Menu);
