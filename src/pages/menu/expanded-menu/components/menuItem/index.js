import { memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "wouter";
import { useQuery } from "react-query";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import Loader from "components/loader";

import { theme } from "theme";
import Basket from "assets/icons/expanded-menu/basket.svg";
import BasketState from "atoms/basket";
import { useTranslation } from "contexts/translation-context";
import getMenuItemsByCategoryId from "services/getMenuItemsByCategoryId";

const MenuItem = ({ restaurantId, tableId, categoryId }) => {
  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);
  const [, setLocation] = useLocation();

  const {
    strings: { expandedMenu: translations },
  } = useTranslation();

  const menuItems = useQuery(
    ["menuItems", { categoryId }],
    getMenuItemsByCategoryId
  );

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

  return !menuItems.isLoading ? (
    <Flex
      boxSizing="border-box"
      px={theme.spacing(1)}
      overflowY="auto"
      width={1}
      height={1}
    >
      <Flex direction="column" width={1} height={1}>
        {menuItems.data.map((currentValue) => (
          <s.Container key={currentValue._id} mb={theme.spacing(1)} width={1}>
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
  ) : (
    <Loader />
  );
};

const s = {
  IconBasket: styled(Flex)`
    position: absolute;
    right: 16px;
    top: 16px;
  `,
  Container: styled(Flex)`
    position: relative;

    box-shadow: 0 5px 15px var(--box-shadow);
    border-radius: 16px;
  `,
};

MenuItem.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  categoryId: PropTypes.string,
};

export default memo(MenuItem);
