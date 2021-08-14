import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Basket from "assets/icons/back-office/basket.svg";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import EditIcon from "assets/icons/back-office/edit_icon.svg";
import DeleteMenuItemPopup from "./popup-windows/menu-item/delete-menu-item-popup";
import EditMenuItemPopup from "./popup-windows/menu-item/edit-menu-item-popup";
import ControlButton from "./control-button";
import { theme } from "theme";

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
    { menuItem, categories, translations }
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
        <Flex mr={theme.spacing(1)}>
          <ControlButton
            Icon={EditIcon}
            buttonAction={editMenuItem}
            title={translations["edit_item"]}
          />
          <ControlButton
            Icon={Basket}
            buttonAction={deleteMenuItem}
            stroke="red"
            title={translations["delete_item"]}
          />
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
