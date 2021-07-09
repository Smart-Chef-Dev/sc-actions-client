import { memo } from "react";
import { useRoute, useLocation } from "wouter";
import { useInfiniteQuery, useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import Loader from "components/loaders";
import Navigation from "./components/navigation";
import MenuItem from "./components/menuItem";
import ReturnMainMenuButton from "./components/returnMainMenuButton";

import getAllCategories from "services/getAllCategories";
import getMenuItemsByCategoryIdInLimit from "services/getMenuItemsByCategoryIdInLimit";

import BasketState from "atoms/basket";
import { useTranslation } from "contexts/translation-context";

const numberOfPagesPerDownload = 5;

const ExpandedMenu = () => {
  const [, { restaurantId, categoryId, tableId }] = useRoute(
    Routes.EXPANDED_MENU
  );
  const [, setLocation] = useLocation();

  const {
    strings: { expandedMenu: translations },
  } = useTranslation();

  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);
  const category = useQuery(["categories", { restaurantId }], getAllCategories);
  const menuItems = useInfiniteQuery(
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

  return !category.isLoading && !menuItems.isLoading ? (
    <Flex direction="column" height={1} width={1}>
      <ReturnMainMenuButton
        restaurantId={restaurantId}
        tableId={tableId}
        translations={translations}
        onLocation={setLocation}
      />
      <Flex direction="column" height={1} width={1}>
        <Navigation
          category={category.data}
          currentCategoryId={categoryId}
          onLocation={setLocation}
        />
        <MenuItem
          menuItems={menuItems}
          restaurantId={restaurantId}
          tableId={tableId}
          categoryId={categoryId}
          basketAtoms={basketAtoms}
          onBasketAtoms={setBasketAtoms}
          translations={translations}
          onLocation={setLocation}
        />
      </Flex>
    </Flex>
  ) : (
    <Loader />
  );
};

export default memo(ExpandedMenu);
