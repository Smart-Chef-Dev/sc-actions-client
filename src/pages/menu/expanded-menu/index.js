import { memo, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "react-query";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Text } from "components/text";
import Loader from "components/loader";
import Navigation from "./components/navigation";
import MenuItem from "./components/menuItem";

import { useTranslation } from "contexts/translation-context";
import { theme } from "theme";

import Arrow from "assets/icons/expanded-menu/arrow.svg";

import getAllCategories from "services/getAllCategories";

const ExpandedMenu = () => {
  const [, { restaurantId, categoryId, tableId }] = useRoute(
    Routes.EXPANDED_MENU
  );
  const [, setLocation] = useLocation();

  const {
    strings: { expandedMenu: translations },
  } = useTranslation();

  const category = useQuery(["categories", { restaurantId }], getAllCategories);

  const handleArrowClick = useCallback(() => {
    setLocation(`/restaurant/${restaurantId}/${tableId}`);
  }, [setLocation, restaurantId, tableId]);

  return !category.isLoading ? (
    <Flex direction="column" height={1} width={1}>
      <s.Arrow alignItems="center" onClick={handleArrowClick}>
        <Arrow />
        <Text color="var(--text-grey)" fontSize={theme.fontSize(2)}>
          {translations["menu"]}
        </Text>
      </s.Arrow>
      <Flex direction="column" height={1} width={1}>
        <Navigation category={category.data} currentCategoryId={categoryId} />
        <MenuItem
          restaurantId={restaurantId}
          tableId={tableId}
          categoryId={categoryId}
        />
      </Flex>
    </Flex>
  ) : (
    <Loader />
  );
};
const s = {
  Arrow: styled(Flex)`
    position: absolute;
    left: 8px;
    top: 12px;
  `,
};
export default memo(ExpandedMenu);
