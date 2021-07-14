import { createRef, memo } from "react";
import { useRoute, useLocation } from "wouter";
import { useInfiniteQuery, useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import Navigation from "./components/navigation";
import MenuItem from "./components/menu-item";
import ReturnMainMenuButton from "./components/return-main-menu-button";

import getAllCategories from "services/getAllCategories";
import getMenuItemsByCategoryIdInLimit from "services/getMenuItemsByCategoryIdInLimit";

import BasketState from "atoms/basket";
import { useTranslation } from "contexts/translation-context";

const numberOfPagesPerDownload = 5;

const menuItemsRef = createRef();

const ExpandedMenu = () => {
  const [, { restaurantId, categoryId, tableId }] = useRoute(
    Routes.EXPANDED_MENU
  );
  const [, setLocation] = useLocation();

  const {
    strings: { expandedMenu: translations },
  } = useTranslation();

  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);
  const categories = useQuery(
    ["categories", { restaurantId }],
    getAllCategories
  );
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

  return (
    <Flex
      direction="column"
      height={1}
      width={1}
      overflowY="hidden"
      overflowX="hidden"
    >
      <Flex height={1} width={1} flex={1}>
        <ReturnMainMenuButton
          restaurantId={restaurantId}
          tableId={tableId}
          translations={translations}
          onLocation={setLocation}
        />
      </Flex>
      <Flex height={1} width={1} flex={1}>
        <Navigation
          categories={categories}
          currentCategoryId={categoryId}
          onLocation={setLocation}
        />
      </Flex>
      <Flex
        ref={menuItemsRef}
        height={1}
        width={1}
        overflowY="auto"
        id={`menuItems(${categoryId})`}
      >
        <MenuItem
          menuItems={menuItems}
          restaurantId={restaurantId}
          tableId={tableId}
          categoryId={categoryId}
          basketAtoms={basketAtoms}
          onBasketAtoms={setBasketAtoms}
          translations={translations}
          onLocation={setLocation}
          menuItemsRef={menuItemsRef}
        />
      </Flex>
    </Flex>
  );
};

export default memo(ExpandedMenu);
