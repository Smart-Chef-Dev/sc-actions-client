import { memo, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import MenuItem from "pages/menu/main-menu/components/menuItem/index";
import { theme } from "theme";

import Arrow from "assets/icons/main-menu/arrow.svg";

import getMenuItemsByCategoryIdInLimit from "services/getMenuItemsByCategoryIdInLimit";

const numberOfPagesPerDownload = 5;

const Category = ({ restaurantId, tableId, onLocation, category }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

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

  const handleArrowClick = useCallback(
    (categoryId) => () => {
      onLocation(`/restaurant/${restaurantId}/${tableId}/${categoryId}`);
    },
    [onLocation, restaurantId, tableId]
  );

  return (
    <Flex direction="column" width={1} ref={ref}>
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
        {inView && (
          <MenuItem
            categoryId={category._id}
            restaurantId={restaurantId}
            tableId={tableId}
            onLocation={onLocation}
            menuItems={menuItems}
          />
        )}
      </Flex>
      <Divider ml={theme.spacing(1)} mb={theme.spacing(1)} />
    </Flex>
  );
};

Category.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
  category: PropTypes.object,
};

export default memo(Category);
