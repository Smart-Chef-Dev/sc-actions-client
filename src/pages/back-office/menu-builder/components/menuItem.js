import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";

import { Text } from "components/text";
import { Flex } from "components/flex";
import { swapMenuItems } from "services/menuItemsService";
import { theme } from "theme";
import MenuItemControlButtons from "./menu-item-control-buttons";
import SwapElement from "./swap-element";

const MenuItem = ({ menuItem, menuItems, index, categories, translations }) => {
  const [menuItemInFocus, setMenuItemInFocus] = useState(false);

  const expandTabMenu = useCallback(() => setMenuItemInFocus(true), []);
  const collapseTabMenu = useCallback(() => setMenuItemInFocus(false), []);

  return (
    <Flex
      onMouseEnter={expandTabMenu}
      onMouseLeave={collapseTabMenu}
      width={1}
      background={menuItemInFocus ? "var(--red-color-for-selected-object)" : ""}
      p={theme.spacing(1)}
      pl={theme.spacing(5)}
      boxSizing="border-box"
      alignItems="center"
    >
      <SwapElement
        index={index}
        element={menuItem}
        isButtonsDisplay={menuItemInFocus}
        swapService={swapMenuItems}
        queryKey={["menuItems", { categoryId: menuItem.category._id }]}
      />
      <Text
        width={1}
        boxSizing="border-box"
        fontSize={theme.fontSize(0)}
        color={!menuItemInFocus ? "var(--text-grey)" : ""}
      >
        {menuItem.name}
      </Text>
      <MenuItemControlButtons
        menuItem={menuItem}
        menuItems={menuItems}
        menuItemInFocus={menuItemInFocus}
        categories={categories}
        translations={translations}
      />
    </Flex>
  );
};

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  menuItems: PropTypes.array,
  categories: PropTypes.array,
  translations: PropTypes.object,
  index: PropTypes.number,
};

export default memo(MenuItem);
