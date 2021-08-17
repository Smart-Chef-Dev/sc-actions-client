import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Basket from "assets/icons/back-office/basket.svg";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import EditIcon from "assets/icons/back-office/edit_icon.svg";
import DeletePopup from "./popup-windows/delete-popup";
import ConstructMenuItemPopup from "./popup-windows/construct-menu-item-popup/construct-menu-item-popup";
import ControlButton from "./control-button";
import { theme } from "theme";

const MenuItemControlButtons = ({
  menuItem,
  menuItems,
  menuItemInFocus,
  translations,
  restaurantId,
}) => {
  const deleteMenuItemPopup = useConfirmationPopup(
    DeletePopup,
    {
      width: "500px",
      height: "350px",
    },
    { menuItem, menuItems, translations }
  );

  const editMenuItemPopup = useConfirmationPopup(
    ConstructMenuItemPopup,
    {
      width: "900px",
      height: "700px",
    },
    { menuItem, translations, restaurantId }
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
  menuItemInFocus: PropTypes.bool,
  translations: PropTypes.object,
  restaurantId: PropTypes.string,
};

export default memo(MenuItemControlButtons);
