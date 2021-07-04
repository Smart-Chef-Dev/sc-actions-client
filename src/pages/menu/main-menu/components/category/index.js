import { memo, useCallback } from "react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import Loader from "components/loader";
import MenuItem from "pages/menu/main-menu/components/menuItem/index";

import { theme } from "theme";

import Arrow from "assets/icons/main-menu/arrow.svg";

import PropTypes from "prop-types";

const Category = ({ restaurantId, tableId, onLocation, categories }) => {
  const { isError, isLoading, data } = categories;

  const handleArrowClick = useCallback(
    (categoryId) => () => {
      onLocation(`/restaurant/${restaurantId}/${tableId}/${categoryId}`);
    },
    [onLocation, restaurantId, tableId]
  );

  return !isLoading ? (
    <Flex direction="column" overflowY="auto" overflowX="hidden" width={1}>
      {!isError &&
        data.map((currentCategory) => (
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
              <MenuItem
                categoryId={currentCategory._id}
                restaurantId={restaurantId}
                tableId={tableId}
                onLocation={onLocation}
              />
            </Flex>
            <Divider ml={theme.spacing(1)} mb={theme.spacing(1)} />
          </Flex>
        ))}
    </Flex>
  ) : (
    <>
      <Loader />
    </>
  );
};

Category.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
  categories: PropTypes.object,
};

export default memo(Category);
