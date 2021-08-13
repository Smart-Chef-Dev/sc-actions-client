import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Basket from "assets/icons/back-office/basket.svg";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import EditIcon from "assets/icons/back-office/edit_icon.svg";
import DeleteMenuItemPopup from "./popup-windows/delete-menu-item-popup";
import { theme } from "theme";
import EditMenuItemPopup from "./popup-windows/edit-menu-item-popup";

const MenuItemControlButtons = ({
  menuItem,
  menuItems,
  menuItemInFocus,
  categories,
  translations,
}) => {
  const deleteMenuItemPopup = useConfirmationPopup(
    DeleteMenuItemPopup,
    "500px",
    "350px",
    { menuItem, menuItems, translations }
  );

  const editMenuItemPopup = useConfirmationPopup(
    EditMenuItemPopup,
    "900px",
    "700px",
    { menuItem, menuItems, categories, translations }
  );

  const deleteMenuItem = useCallback(() => {
    deleteMenuItemPopup.showNotification();
  }, [deleteMenuItemPopup]);

  const editMenuItem = useCallback(() => {
    editMenuItemPopup.showNotification();
  }, [editMenuItemPopup]);

  return (
    <Flex>
      {deleteMenuItemPopup.renderNotification()}
      {editMenuItemPopup.renderNotification()}
      {menuItemInFocus && (
        <Flex>
          <Flex>
            <EditIcon onClick={editMenuItem} />
          </Flex>
          <Flex ml={theme.spacing(1)}>
            <Basket stroke="red" onClick={deleteMenuItem} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

MenuItemControlButtons.propTypes = {
  menuItem: PropTypes.object,
  menuItems: PropTypes.array,
  categories: PropTypes.array,
  menuItemInFocus: PropTypes.bool,
  translations: PropTypes.object,
};

export default memo(MenuItemControlButtons);
