import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import DeleteCategoryPopup from "./popup-windows/category/delete-category-popup";
import ConstructCategoryPopup from "./popup-windows/category/construct-category-popup";
import ConstructMenuItemPopup from "./popup-windows/menu-item/construct-menu-item-popup";

import CreateItemIcon from "assets/icons/back-office/create_item_icon.svg";
import EditIcon from "assets/icons/back-office/edit_icon.svg";
import Basket from "assets/icons/back-office/basket.svg";
import RedTriangle from "assets/icons/back-office/red_triangle.svg";
import GrayTriangle from "assets/icons/back-office/gray_triangle.svg";
import ControlButton from "./control-button";
import { theme } from "theme";

const CategoryControlButtons = ({
  category,
  restaurantId,
  translations,
  expandedCategoryId,
}) => {
  const deleteCategoryPopup = useConfirmationPopup(
    DeleteCategoryPopup,
    "500px",
    "380px",
    { category, restaurantId, translations }
  );

  const editCategoryPopup = useConfirmationPopup(
    ConstructCategoryPopup,
    "500px",
    "380px",
    {
      category,
      restaurantId,
      translations,
      buttonName: translations["save"],
      heading: translations["edit_category"],
    }
  );

  const addMenuItemPopup = useConfirmationPopup(
    ConstructMenuItemPopup,
    "900px",
    "700px",
    { category, restaurantId, translations }
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
    <>
      {deleteCategoryPopup.renderNotification()}
      {editCategoryPopup.renderNotification()}
      {addMenuItemPopup.renderNotification()}
      <Flex alignItems="center" mr={theme.spacing(2)}>
        {category._id === expandedCategoryId ? (
          <>
            <Flex alignItems="flex-end">
              <ControlButton
                Icon={CreateItemIcon}
                buttonAction={addMenuItem}
                title={translations["create_item"]}
              />
              <ControlButton
                Icon={EditIcon}
                buttonAction={editCategory}
                title={translations["edit_category"]}
              />
              <ControlButton
                Icon={Basket}
                buttonAction={removeCategory}
                stroke="black"
                title={translations["delete_category"]}
              />
            </Flex>
            <RedTriangle />
          </>
        ) : (
          <GrayTriangle />
        )}
      </Flex>
    </>
  );
};

CategoryControlButtons.propTypes = {
  category: PropTypes.object,
  expandedCategoryId: PropTypes.string,
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
};

export default memo(CategoryControlButtons);
