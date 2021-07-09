import { Fragment, memo, useCallback, useMemo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import { theme } from "theme";

import Basket from "assets/icons/expanded-menu/basket.svg";

import "pages/menu/expanded-menu/infinite-scroll-component__outerdiv.css";

const MenuItem = ({
  restaurantId,
  tableId,
  categoryId,
  menuItems,
  basketAtoms,
  onBasketAtoms,
  translations,
  onLocation,
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = menuItems;

  const handleItemClick = useCallback(
    (itemId) => () => {
      onLocation(`/restaurant/${restaurantId}/${tableId}/item/${itemId}`);
    },
    [onLocation, restaurantId, tableId]
  );

  const addProductToOrder = useCallback(
    (product) => () => {
      const isInTheBasket = !!basketAtoms.order.find(
        (currentValue) => currentValue._id === product._id
      );

      if (isInTheBasket) {
        return;
      }

      onBasketAtoms((oldOrder) => {
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
    [onBasketAtoms, basketAtoms]
  );

  const dataLength = useMemo(
    () =>
      !isLoading &&
      data.pages.reduce(
        (previousValues, currentValue) =>
          previousValues + currentValue.items.length,
        0
      ),
    [data, isLoading]
  );

  return (
    !menuItems.isLoading && (
      <Flex height={1} width={1} direction="column" mx={theme.spacing(1)}>
        <InfiniteScroll
          dataLength={dataLength}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          scrollableTarget={`scrollMenuItems(${categoryId})`}
          style={{ overflow: undefined, width: "100%" }}
          loader={<div>Loading...</div>}
        >
          {data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.items.map((currentMenuItems) => (
                <s.Container
                  key={currentMenuItems._id}
                  width={1}
                  direction="column"
                  mb={theme.spacing(1)}
                >
                  <s.IconBasket onClick={addProductToOrder(currentMenuItems)}>
                    <Basket />
                  </s.IconBasket>
                  <Flex
                    onClick={handleItemClick(currentMenuItems._id)}
                    direction="column"
                    width={1}
                  >
                    <Img
                      src={currentMenuItems.pictureUrl}
                      alt={currentMenuItems.name}
                      borderRadius="12px 12px 0 0"
                      width={1}
                    />
                    <Text
                      p={theme.spacing(1)}
                      color="var(--text-grey)"
                      textTransform="uppercase"
                    >
                      {currentMenuItems.category.name}
                    </Text>
                    <Text
                      fontFamily="Actor"
                      pl={theme.spacing(1)}
                      fontSize={theme.fontSize(1)}
                    >
                      {currentMenuItems.name}
                    </Text>
                    <Flex
                      width={1}
                      justifyContent="space-between"
                      p={theme.spacing(1)}
                      boxSizing="border-box"
                      alignItems="center"
                    >
                      <Text
                        color="var(--text-grey)"
                        fontSize={theme.fontSize(0)}
                      >{`${currentMenuItems.weight} ${translations["g"]}`}</Text>
                      <Text fontWeight="bold" fontSize={theme.fontSize(2)}>
                        {currentMenuItems.price}$
                      </Text>
                    </Flex>
                  </Flex>
                </s.Container>
              ))}
            </Fragment>
          ))}
        </InfiniteScroll>
      </Flex>
    )
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
  menuItems: PropTypes.object,
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  categoryId: PropTypes.string,
  basketAtoms: PropTypes.object,
  onBasketAtoms: PropTypes.func,
  translations: PropTypes.object,
  onLocation: PropTypes.func,
};

export default memo(MenuItem);
