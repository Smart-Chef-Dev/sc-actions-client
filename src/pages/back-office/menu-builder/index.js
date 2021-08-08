import { memo, useCallback } from "react";
import { useQuery } from "react-query";
import { useRoute } from "wouter";

import { Flex } from "components/flex";
import Button from "components/button";
import Categories from "./components/categories";
import { theme } from "theme";
import { Routes } from "constants/routes";
import { getAllCategories } from "services/categoriesService";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import AddCategoryPopup from "./components/add-category-popup";

const MenuBuilder = () => {
  const [, { restaurantId }] = useRoute(Routes.MENU_BUILDER);

  const categories = useQuery(
    ["categories", { restaurantId }],
    getAllCategories
  );

  const { renderNotification, showNotification } = useConfirmationPopup(
    AddCategoryPopup,
    "500px",
    "350px"
  );

  const createCategory = useCallback(() => {
    showNotification();
  }, [showNotification]);

  return (
    <Flex
      width={1}
      height={1}
      p={theme.spacing(1)}
      direction="column"
      overflowY="auto"
      boxSizing="border-box"
    >
      {renderNotification()}
      <Flex width={1} justifyContent="flex-end">
        <Button onClick={createCategory}>CREATE CATEGORY</Button>
      </Flex>
      <Flex width={1}>
        <Categories categories={categories} />
      </Flex>
    </Flex>
  );
};

export default memo(MenuBuilder);
