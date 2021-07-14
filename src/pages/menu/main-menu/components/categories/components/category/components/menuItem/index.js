import { Fragment, memo, useCallback, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import { Flex } from "components/flex";
import { Text } from "components/text";
import ImageContainer from "components/image";
import { Img } from "components/img";
import MenuItemLoaders from "components/loaders/main-menu/menu-items-loaders";
import { theme } from "theme";

import getMenuItemsByCategoryIdInLimit from "services/getMenuItemsByCategoryIdInLimit";

const numberOfPagesPerDownload = 5;

const MenuItem = ({ categoryId, restaurantId, tableId, onLocation }) => {
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

  const handleItemClick = useCallback(
    (itemId) => () => {
      onLocation(`/restaurant/${restaurantId}/${tableId}/item/${itemId}`);
    },
    [onLocation, restaurantId, tableId]
  );

  return !isLoading ? (
    <Flex width={1} overflowX="auto" id={`scrollMenuItems(${categoryId})`}>
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget={`scrollMenuItems(${categoryId})`}
        loader={<MenuItemLoaders quantity={1} />}
        className={infiniteScrollComponent}
      >
        {data.pages.map((page, i) => (
          <Fragment key={i}>
            {page.items.map((currentMenuItems) => (
              <Flex
                key={currentMenuItems._id}
                pr={theme.spacing(1)}
                pb={theme.spacing(1)}
              >
                <Flex direction="column">
                  <ImageContainer
                    src={currentMenuItems.pictureUrl}
                    preSrc={currentMenuItems.pictureLqipPreview}
                  >
                    {(src) => (
                      <s.Preview
                        src={src}
                        alt={currentMenuItems.name}
                        loading="lazy"
                        borderRadius="10%"
                        mb={theme.spacing(1)}
                        onClick={handleItemClick(currentMenuItems._id)}
                      />
                    )}
                  </ImageContainer>
                  <s.ProductName>{currentMenuItems.name}</s.ProductName>
                  <Text color="var(--text-grey)">
                    {currentMenuItems.price}$
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Fragment>
        ))}
      </InfiniteScroll>
    </Flex>
  ) : (
    <MenuItemLoaders quantity={7} />
  );
};

const infiniteScrollComponent = css`
  display: flex;
`;

MenuItem.propTypes = {
  categoryId: PropTypes.string,
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
};

const s = {
  Preview: styled(Img)`
    max-width: 135px;
    min-height: 105px;

    object-fit: cover;
  `,
  ProductName: styled(Text)`
    max-width: 130px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `,
};

export default memo(MenuItem);
