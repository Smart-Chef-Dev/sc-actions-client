import { Fragment, memo, useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "wouter";
import { useInfiniteQuery } from "react-query";
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

import getMenuItemsByCategoryIdInLimit from "services/getMenuItemsByCategoryIdInLimit";
import InfiniteScroll from "react-infinite-scroll-component";

const numberOfPagesPerDownload = 5;

const MenuItem = ({ restaurantId, tableId, categoryId }) => {
  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);
  const [, setLocation] = useLocation();

  const {
    strings: { expandedMenu: translations },
  } = useTranslation();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["menuItemsPages", { categoryId }],
    getMenuItemsByCategoryIdInLimit,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.totalPages <= lastPage.page) {
          return false;
        }

        return {
          page: lastPage.page,
          limit: numberOfPagesPerDownload,
        };
      },
    }
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

  console.log(data);

  return !isLoading ? (
    <Flex
      boxSizing="border-box"
      px={theme.spacing(1)}
      overflowY="auto"
      width={1}
      height={1}
      id={`scrollMenuItems(${categoryId})`}
    >
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget={`scrollMenuItems(${categoryId})`}
        style={{ overflow: undefined }}
        loader={<div>Loading...</div>}
      >
        <Flex direction="column" width={1} height={1}>
          {data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.items.map((currentMenuItems) => (
                <s.Container
                  key={currentMenuItems._id}
                  mb={theme.spacing(1)}
                  width={1}
                >
                  <s.IconBasket onClick={addProductToOrder(currentMenuItems)}>
                    <Basket />
                  </s.IconBasket>
                  <Flex
                    direction="column"
                    height={1}
                    width={1}
                    onClick={handleItemClick(currentMenuItems._id)}
                  >
                    <Img
                      src={currentMenuItems.pictureUrl}
                      alt={currentMenuItems.name}
                      borderRadius="12px 12px 0 0"
                      width={1}
                      height={1}
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
        </Flex>
      </InfiniteScroll>
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
