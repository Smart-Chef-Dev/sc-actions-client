import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuItems from "./menuItems";
import { theme } from "theme";
import GrayTriangle from "assets/icons/back-office/gray_triangle.svg";
import RedTriangle from "assets/icons/back-office/red_triangle.svg";
import Basket from "assets/icons/back-office/basket.svg";
import EditIcon from "assets/icons/back-office/edit_icon.svg";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import DeleteCategoryPopup from "./delete-category-popup";
import EditCategoryPopup from "./edit-category-popup";

const Category = ({
  category,
  onExpandedCategoryId,
  expandedCategoryId,
  categories,
  restaurantId,
}) => {
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

  const removeCategory = useCallback(() => {
    deleteCategoryPopup.showNotification();
  }, [deleteCategoryPopup]);

  const editCategory = useCallback(() => {
    editCategoryPopup.showNotification();
  }, [editCategoryPopup]);

  return (
    <Flex width={1} direction="column" pb={0} boxSizing="border-box">
      {deleteCategoryPopup.renderNotification()}
      {editCategoryPopup.renderNotification()}
      <Flex
        width={1}
        justifyContent="space-between"
        alignItems="center"
        onClick={expandCategory}
        p={theme.spacing(1)}
        pl={theme.spacing(4)}
        boxSizing="border-box"
      >
        <Text>{category.name}</Text>
        <Flex alignItems="center">
          <Flex mr={theme.spacing(1)} onClick={editCategory}>
            <EditIcon />
          </Flex>
          <Flex mr={theme.spacing(1)} onClick={removeCategory}>
            <Basket />
          </Flex>
          <Flex>
            {category._id === expandedCategoryId ? (
              <RedTriangle />
            ) : (
              <GrayTriangle />
            )}
          </Flex>
        </Flex>
      </Flex>
      {category._id === expandedCategoryId && (
        <MenuItems categoryId={category._id} />
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
};

export default memo(Category);
