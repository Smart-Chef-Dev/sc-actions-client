import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Basket from "assets/icons/back-office/basket.svg";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import EditIcon from "assets/icons/back-office/edit_icon.svg";
import DeleteMenuItemPopup from "./delete-menu-item-popup";
import { theme } from "theme";
import EditMenuItemPopup from "./edit-menu-item-popup";

const MenuItemControlButtons = ({
  menuItem,
  menuItems,
  menuItemInFocus,
  categories,
}) => {
  const deleteMenuItemPopup = useConfirmationPopup(
    DeleteMenuItemPopup,
    "500px",
    "350px",
    { menuItem, menuItems }
  );

  const editMenuItemPopup = useConfirmationPopup(
    EditMenuItemPopup,
    "900px",
    "700px",
    { menuItem, menuItems, categories }
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
};

export default memo(MenuItemControlButtons);
