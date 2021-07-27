import { Fragment, memo, useCallback, useEffect, useMemo } from "react";
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import { theme } from "theme";
import MenuItemLoaders from "components/loaders/expanded-menu/menu-items-loaders";
import ImageContainer from "components/image";
import NotificationWithTexts from "components/notificationWithTexts";

import Basket from "assets/icons/expanded-menu/basket.svg";
import "pages/menu/expanded-menu/infinite-scroll-component.css";
import { useNotifications } from "hooks/useNotifications";
import { formatCurrency } from "utils/formatCurrency";

const MenuItem = ({
  restaurantId,
  tableId,
  categoryId,
  menuItems,
  basketAtoms,
  onBasketAtoms,
  translations,
  onLocation,
  menuItemsRef,
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = menuItems;

  const { renderNotification, showNotification } = useNotifications(
    <NotificationWithTexts texts={[translations["product_added_to_order"]]} />
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

  useEffect(() => {
    menuItemsRef.current.scrollTo({
      top: 0,
    });

    // should only fire when categoryId changes
    // eslint-disable-next-line
  }, [categoryId]);

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

      showNotification();
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
    [onBasketAtoms, basketAtoms, showNotification]
  );

  return !menuItems.isLoading ? (
    <Flex height={1} width={1} direction="column" mx={theme.spacing(1)}>
      {renderNotification()}
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget={`menuItems(${categoryId})`}
        className={infiniteScrollClass}
        loader={<MenuItemLoaders quantity={1} />}
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
                  <ImageContainer
                    src={currentMenuItems.pictureUrl}
                    preSrc={currentMenuItems.pictureLqipPreview}
                  >
                    {(src) => (
                      <Img
                        src={src}
                        alt={currentMenuItems.name}
                        loading="lazy"
                        borderRadius="12px 12px 0 0"
                        width={1}
                      />
                    )}
                  </ImageContainer>
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
                    {currentMenuItems.weight ? (
                      <Text
                        color="var(--text-grey)"
                        fontSize={theme.fontSize(0)}
                      >{`${currentMenuItems.weight} ${translations["g"]}`}</Text>
                    ) : (
                      <Text
                        color="var(--text-grey)"
                        fontSize={theme.fontSize(0)}
                      >{``}</Text>
                    )}

                    <Text fontWeight="bold" fontSize={theme.fontSize(2)}>
                      {formatCurrency(
                        currentMenuItems.category.restaurant.currencyCode,
                        currentMenuItems.price
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </s.Container>
            ))}
          </Fragment>
        ))}
      </InfiniteScroll>
    </Flex>
  ) : (
    <Flex
      width={1}
      direction="column"
      px={theme.spacing(1)}
      boxSizing="border-box"
    >
      <MenuItemLoaders quantity={7} />
    </Flex>
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

const infiniteScrollClass = css`
  overflow: visible !important;
  width: 100%;
`;

MenuItem.propTypes = {
  menuItems: PropTypes.object,
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  categoryId: PropTypes.string,
  basketAtoms: PropTypes.object,
  onBasketAtoms: PropTypes.func,
  translations: PropTypes.object,
  menuItemsRef: PropTypes.object,
  onLocation: PropTypes.func,
};

export default memo(MenuItem);
