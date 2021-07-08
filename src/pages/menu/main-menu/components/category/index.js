import { memo, useCallback, useEffect, useMemo } from "react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import MenuItem from "pages/menu/main-menu/components/menuItem/index";

import { theme } from "theme";

import Arrow from "assets/icons/main-menu/arrow.svg";

import PropTypes from "prop-types";
import { useInfiniteQuery } from "react-query";
import getMenuItemsByCategoryIdInLimit from "../../../../../services/getMenuItemsByCategoryIdInLimit";
const numberOfPagesPerDownload = 5;

const Category = ({
  restaurantId,
  tableId,
  onLocation,
  category,
  listRef,
  index,
  onItemsSizes,
  itemsSizes,
  elementSizeWithoutText,
}) => {
  const menuItems = useInfiniteQuery(
    ["menuItemsPages", { categoryId: category._id }],
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

  const allPages = useMemo(
    () =>
      !menuItems.isLoading &&
      menuItems.data.pages.reduce(
        (previousValues, currentValue) => [
          ...previousValues,
          ...currentValue.items,
        ],
        []
      ),
    [menuItems]
  );

  const longestName = useMemo(
    () =>
      !menuItems.isLoading &&
      allPages.reduce(
        (previousValues, currentValue) =>
          currentValue.name.length > previousValues
            ? currentValue.name.length
            : previousValues,
        0
      ),
    [menuItems, allPages]
  );

  useEffect(() => {
    const itemSize = itemsSizes.find((itemSize) => itemSize.index === index);

    if (!itemSize && longestName) {
      onItemsSizes([
        ...itemsSizes,
        { size: elementSizeWithoutText + longestName, index: index },
      ]);
      listRef.current.resetAfterIndex(index);
      return;
    }

    if (itemSize && itemSize.size - longestName !== elementSizeWithoutText) {
      onItemsSizes((oldValue) =>
        oldValue.map((currentValue) =>
          currentValue.index === index
            ? { size: elementSizeWithoutText + longestName, index: index }
            : currentValue
        )
      );

      listRef.current.resetAfterIndex(index);
    }
  }, [listRef, index, longestName, itemsSizes, onItemsSizes]);

  const handleArrowClick = useCallback(
    (categoryId) => () => {
      onLocation(`/restaurant/${restaurantId}/${tableId}/${categoryId}`);
    },
    [onLocation, restaurantId, tableId]
  );

  return (
    <Flex direction="column" overflowY="auto" overflowX="hidden" width={1}>
      <Flex key={category._id} direction="column" width={1}>
        <Flex width={1}>
          <Text fontSize={theme.fontSize(2)} fontWeight="bold">
            {category.name}
          </Text>
          <Flex
            width={1}
            height={1}
            flex="1"
            mr={theme.spacing(1)}
            direction="row-reverse"
            alignItems="center"
          >
            <Arrow onClick={handleArrowClick(category._id)} />
          </Flex>
        </Flex>
        <Flex
          boxSizing="border-box"
          pl={theme.spacing(1)}
          pt={theme.spacing(1)}
          width={1}
          height={1}
        >
          <MenuItem
            categoryId={category._id}
            restaurantId={restaurantId}
            tableId={tableId}
            onLocation={onLocation}
            menuItems={menuItems}
          />
        </Flex>
        <Divider ml={theme.spacing(1)} mb={theme.spacing(1)} />
      </Flex>
    </Flex>
  );
};

Category.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
  category: PropTypes.object,
  listRef: PropTypes.object,
  onItemsSizes: PropTypes.func,
  itemsSizes: PropTypes.array,
  index: PropTypes.string,
  elementSizeWithoutText: PropTypes.number,
};

export default memo(Category);
