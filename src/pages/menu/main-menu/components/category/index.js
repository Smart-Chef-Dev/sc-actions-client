import { memo, useCallback } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import Loader from "components/loader";
import MenuItem from "pages/menu/main-menu/components/menuItem/index";

import { theme } from "theme";
import { Routes } from "constants/routes";

import Arrow from "assets/icons/main-menu/arrow.svg";

import getAllCategories from "services/getAllCategories";

const Category = () => {
  const [, setLocation] = useLocation();
  const [, { restaurantId, tableId }] = useRoute(Routes.MENU);

  const { isError, isLoading, data } = useQuery(
    ["categories", { restaurantId }],
    getAllCategories
  );

  const handleArrowClick = useCallback(
    (categoryId) => () => {
      setLocation(`/restaurant/${restaurantId}/${tableId}/${categoryId}`);
    },
    [setLocation, restaurantId, tableId]
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
              <MenuItem categoryId={currentCategory._id} />
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

export default memo(Category);
