import { memo, useCallback } from "react";
import { useQuery } from "react-query";
import { useLocation, useRoute } from "wouter";

import { Flex } from "components/flex";
import Button from "components/button";
import Categories from "./components/categories";
import { theme } from "theme";
import { Routes } from "constants/routes";
import { getAllCategories } from "services/categoriesService";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import AddCategoryPopup from "./components/add-category-popup";
import { checkingUserAccess } from "services/restaurantService";
import { useTranslation } from "../../../contexts/translation-context";

const MenuBuilder = () => {
  const [, { restaurantId }] = useRoute(Routes.MENU_BUILDER);
  const [, setLocation] = useLocation();

  const {
    strings: { menuBuilder: translations },
  } = useTranslation();

  const categories = useQuery(
    ["categories", { restaurantId }],
    getAllCategories
  );
  const { isLoading } = useQuery(
    ["verificationOfRights", { restaurantId }],
    checkingUserAccess,
    {
      retry: 1,
      onError: () => {
        setLocation(Routes.SING_IN);
      },
    }
  );

  const { renderNotification, showNotification } = useConfirmationPopup(
    AddCategoryPopup,
    "500px",
    "380px",
    { restaurantId, categories: categories.data, translations }
  );

  const createCategory = useCallback(() => {
    showNotification();
  }, [showNotification]);

  return (
    !isLoading && (
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
          <Button onClick={createCategory} width="auto">
            {translations["create_category_bold"]}
          </Button>
        </Flex>
        <Flex width={1}>
          <Categories
            categories={categories}
            restaurantId={restaurantId}
            translations={translations}
          />
        </Flex>
      </Flex>
    )
  );
};

export default memo(MenuBuilder);
