import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuItems from "./menuItems";
import { theme } from "theme";

import GrayTriangle from "assets/icons/back-office/gray_triangle.svg";
import RedTriangle from "assets/icons/back-office/red_triangle.svg";
import Basket from "assets/icons/back-office/basket.svg";
import EditIcon from "assets/icons/back-office/edit_icon.svg";

import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import DeleteCategoryPopup from "./popup-windows/delete-category-popup";
import EditCategoryPopup from "./popup-windows/edit-category-popup";
import { swapCategories } from "services/categoriesService";
import AddMenuItemPopup from "./popup-windows/add-menu-item-popup";
import CreateItemIcon from "assets/icons/back-office/create_item_icon.svg";
import { getMenuItemsByCategoryId } from "services/menuItemsService";
import SwapElement from "./swap-element";

const Category = ({
  category,
  onExpandedCategoryId,
  expandedCategoryId,
  categories,
  restaurantId,
  index,
  translations,
}) => {
  const menuItems = useQuery(
    ["menuItems", { categoryId: category._id }],
    getMenuItemsByCategoryId
  );

  const expandCategory = useCallback(
    () =>
      onExpandedCategoryId((oldExpandedCategoryId) =>
        oldExpandedCategoryId === category._id ? "" : category._id
      ),
    [category._id, onExpandedCategoryId]
  );

  const deleteCategoryPopup = useConfirmationPopup(
    DeleteCategoryPopup,
    "500px",
    "380px",
    { category: category, categories, restaurantId, translations }
  );

  const editCategoryPopup = useConfirmationPopup(
    EditCategoryPopup,
    "500px",
    "380px",
    { category: category, categories, restaurantId, translations }
  );

  const addMenuItemPopup = useConfirmationPopup(
    AddMenuItemPopup,
    "900px",
    "700px",
    { categories, category, restaurantId, translations }
  );

  const removeCategory = useCallback(() => {
    deleteCategoryPopup.showNotification();
  }, [deleteCategoryPopup]);

  const editCategory = useCallback(() => {
    editCategoryPopup.showNotification();
  }, [editCategoryPopup]);

  const addMenuItem = useCallback(() => {
    addMenuItemPopup.showNotification();
  }, [addMenuItemPopup]);

  return (
    <Flex width={1} direction="column" pb={0} boxSizing="border-box">
      {deleteCategoryPopup.renderNotification()}
      {editCategoryPopup.renderNotification()}
      {addMenuItemPopup.renderNotification()}
      <Flex
        width={1}
        justifyContent="space-between"
        alignItems="center"
        p={theme.spacing(1)}
        pl={theme.spacing(3)}
        boxSizing="border-box"
        onClick={expandCategory}
      >
        <Flex alignItems="center">
          <SwapElement
            index={index}
            element={category}
            isButtonsDisplay={true}
            swapService={swapCategories}
            queryKey={["categories", { restaurantId }]}
          />
          <Text>{category.name}</Text>
        </Flex>
        <Flex alignItems="center">
          {category._id === expandedCategoryId ? (
            <>
              <Flex
                onClick={(e) => {
                  e.stopPropagation();
                }}
                alignItems="flex-end"
              >
                <Flex mr={theme.spacing(1)} alignItems="center">
                  <CreateItemIcon onClick={addMenuItem} />
                </Flex>
                <Flex mr={theme.spacing(1)}>
                  <EditIcon onClick={editCategory} />
                </Flex>
                <Flex mr={theme.spacing(1)}>
                  <Basket onClick={removeCategory} stroke="black" />
                </Flex>
              </Flex>
              <RedTriangle />
            </>
          ) : (
            <GrayTriangle />
          )}
        </Flex>
      </Flex>
      {category._id === expandedCategoryId && (
        <MenuItems
          categoryId={category._id}
          menuItems={menuItems}
          categories={categories}
          translations={translations}
        />
      )}
    </Flex>
  );
};

Category.propTypes = {
  category: PropTypes.object,
  categories: PropTypes.array,
  onExpandedCategoryId: PropTypes.func,
  expandedCategoryId: PropTypes.string,
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
  index: PropTypes.number,
};

export default memo(Category);
