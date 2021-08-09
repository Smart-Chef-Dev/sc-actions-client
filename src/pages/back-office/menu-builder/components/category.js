import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuItems from "./menuItems";
import { theme } from "theme";

import GrayTriangle from "assets/icons/back-office/gray_triangle.svg";
import RedTriangle from "assets/icons/back-office/red_triangle.svg";
import Basket from "assets/icons/back-office/basket.svg";
import EditIcon from "assets/icons/back-office/edit_icon.svg";
import UpArrow from "assets/icons/back-office/up_arrow.svg";
import ArrowToDown from "assets/icons/back-office/arrow_to_down.svg";

import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import DeleteCategoryPopup from "./delete-category-popup";
import EditCategoryPopup from "./edit-category-popup";
import { swapCategories } from "services/categoriesService";
import AddMenuItemPopup from "./add-menu-item-popup";
import CreateItemIcon from "assets/icons/back-office/create_item_icon.svg";
import { getMenuItemsByCategoryId } from "services/menuItemsService";

const Category = ({
  category,
  onExpandedCategoryId,
  expandedCategoryId,
  categories,
  restaurantId,
  index,
}) => {
  const menuItems = useQuery(
    ["menuItems", { categoryId: category._id }],
    getMenuItemsByCategoryId
  );

  const queryClient = useQueryClient();
  const raiseCategoryMutation = useMutation(swapCategories, {
    onSuccess: () => {
      queryClient.setQueryData(
        ["categories", { restaurantId }],
        categories.map((currentCategory, i) => {
          if (index - 1 === i) {
            return category;
          }

          if (index === i) {
            return categories[index - 1];
          }

          return currentCategory;
        })
      );
    },
  });

  const omitCategoryMutation = useMutation(swapCategories, {
    onSuccess: () => {
      queryClient.setQueryData(
        ["categories", { restaurantId }],
        categories.map((currentCategory, i) => {
          if (index + 1 === i) {
            return category;
          }

          if (index === i) {
            return categories[index + 1];
          }

          return currentCategory;
        })
      );
    },
  });

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
    { category: category, categories, restaurantId }
  );

  const editCategoryPopup = useConfirmationPopup(
    EditCategoryPopup,
    "500px",
    "380px",
    { category: category, categories, restaurantId }
  );

  const addMenuItemPopup = useConfirmationPopup(
    AddMenuItemPopup,
    "900px",
    "700px",
    { categories, category, restaurantId, menuItems: menuItems.data }
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

  const raiseCategory = useCallback(async () => {
    if (index === 0) {
      return;
    }

    await raiseCategoryMutation.mutateAsync({
      categoryId1: category._id,
      categoryId2: categories[index - 1]._id,
    });
  }, [raiseCategoryMutation, category, categories, index]);

  const omitCategory = useCallback(async () => {
    if (index === categories.length - 1) {
      return;
    }

    await omitCategoryMutation.mutateAsync({
      categoryId1: category._id,
      categoryId2: categories[index + 1]._id,
    });
  }, [omitCategoryMutation, category, categories, index]);

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
          <Flex
            direction="column"
            mr={theme.spacing(1)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <UpArrow onClick={raiseCategory} />
            <ArrowToDown onClick={omitCategory} />
          </Flex>
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
        <MenuItems categoryId={category._id} menuItems={menuItems} />
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
  index: PropTypes.number,
};

export default memo(Category);
