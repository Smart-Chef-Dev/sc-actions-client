import { memo, useCallback, Fragment, useMemo } from "react";
import { useLocation, useRoute } from "wouter";
import { useInfiniteQuery } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import Loader from "components/loader";
import MenuItem from "pages/menu/main-menu/components/menuItem/index";

import { theme } from "theme";
import { Routes } from "constants/routes";

import Arrow from "assets/icons/main-menu/arrow.svg";

import getAllCategoriesInLimit from "services/getAllCategoriesInLimit";
import InfiniteScroll from "react-infinite-scroll-component";

import "./infinite-scroll-component__outerdiv.css";

const numberOfPagesPerDownload = 5;

const Category = () => {
  const [, setLocation] = useLocation();
  const [, { restaurantId, tableId }] = useRoute(Routes.MENU);

  const {
    isError,
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["categories", { restaurantId }],
    getAllCategoriesInLimit,
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

  const handleArrowClick = useCallback(
    (categoryId) => () => {
      setLocation(`/restaurant/${restaurantId}/${tableId}/${categoryId}`);
    },
    [setLocation, restaurantId, tableId]
  );

  console.log(data);

  const dataLength = useMemo(
    () =>
      !isLoading &&
      data.pages &&
      data.pages.reduce(
        (previousValues, currentValue) =>
          previousValues + currentValue.categories.length,
        0
      ),
    [data, isLoading]
  );

  return !isLoading ? (
    <Flex
      direction="column"
      overflowY="auto"
      overflowX="hidden"
      width={1}
      style={{ id: "add" }}
      id="infinite-scroll"
    >
      {!isError && (
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          dataLength={dataLength}
          loader={<div>Loading...</div>}
          scrollableTarget="infinite-scroll"
          style={{ overflow: "hidden", width: "100%" }}
        >
          {data.pages.map((page) => (
            <Fragment key={page.page}>
              {page.categories.map((currentCategory) => (
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
                    <MenuItem categoryId={currentCategory._id} />
                  </Flex>
                  <Divider ml={theme.spacing(1)} mb={theme.spacing(1)} />
                </Flex>
              ))}
            </Fragment>
          ))}
        </InfiniteScroll>
      )}
    </Flex>
  ) : (
    <>
      <Loader />
    </>
  );
};

export default memo(Category);
