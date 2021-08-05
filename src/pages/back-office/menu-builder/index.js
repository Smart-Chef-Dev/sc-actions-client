import { memo } from "react";
import { useQuery } from "react-query";
import { useRoute } from "wouter";

import { Flex } from "components/flex";
import Button from "components/button";
import Categories from "./components/categories";
import { theme } from "theme";
import { Routes } from "constants/routes";
import { getAllCategories } from "services/categoriesService";

const MenuBuilder = () => {
  const [, { restaurantId }] = useRoute(Routes.MENU_BUILDER);

  const categories = useQuery(
    ["categories", { restaurantId }],
    getAllCategories
  );

  return (
    <Flex width={1} p={theme.spacing(1)} direction="column">
      <Flex width={1} justifyContent="flex-end">
        <Button>CREATE CATEGORY</Button>
      </Flex>
      <Flex width={1}>
        <Categories categories={categories} />
      </Flex>
    </Flex>
  );
};

export default memo(MenuBuilder);
