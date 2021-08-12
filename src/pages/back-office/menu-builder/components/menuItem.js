import { memo, useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import { Text } from "components/text";
import { Flex } from "components/flex";
import { swapCategories } from "services/categoriesService";
import UpArrow from "assets/icons/back-office/up_arrow.svg";
import ArrowToDown from "assets/icons/back-office/arrow_to_down.svg";
import { theme } from "theme";
import MenuItemControlButtons from "./menu-item-control-buttons";

const MenuItem = ({ menuItem, menuItems, index, categories, translations }) => {
  const [menuItemInFocus, setMenuItemInFocus] = useState(false);
  const queryClient = useQueryClient();

  const raiseMenuItemMutation = useMutation(swapCategories, {
    onSuccess: () => {
      queryClient.setQueryData(
        ["menuItems", { categoryId: menuItem.category._id }],
        menuItems.map((currentCategory, i) => {
          if (index - 1 === i) {
            return menuItem;
          }

          if (index === i) {
            return menuItems[index - 1];
          }

          return currentCategory;
        })
      );
    },
  });

  const omitMenuItemMutation = useMutation(swapCategories, {
    onSuccess: () => {
      queryClient.setQueryData(
        ["menuItems", { categoryId: menuItem.category._id }],
        menuItems.map((currentMenuItem, i) => {
          if (index + 1 === i) {
            return menuItem;
          }

          if (index === i) {
            return menuItems[index + 1];
          }

          return currentMenuItem;
        })
      );
    },
  });

  const expandTabMenu = useCallback(() => setMenuItemInFocus(true), []);
  const collapseTabMenu = useCallback(() => setMenuItemInFocus(false), []);

  const raiseMenuItem = useCallback(async () => {
    if (index === 0) {
      return;
    }

    await raiseMenuItemMutation.mutateAsync({
      menuItemId1: menuItem,
      menuItemId2: menuItems[index - 1]._id,
    });
  }, [index, menuItems, raiseMenuItemMutation, menuItem]);

  const omitMenuItem = useCallback(async () => {
    if (index === menuItems.length - 1) {
      return;
    }

    await omitMenuItemMutation.mutateAsync({
      menuItemId1: menuItem,
      menuItemId2: menuItems[index + 1]._id,
    });
  }, [index, menuItems, omitMenuItemMutation, menuItem]);

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
      <Flex direction="column" mr={theme.spacing(1)}>
        {menuItemInFocus ? (
          <Flex direction="column">
            <UpArrow onClick={raiseMenuItem} />
            <ArrowToDown onClick={omitMenuItem} />
          </Flex>
        ) : (
          <NoFocusButtons direction="column">
            <UpArrow />
            <ArrowToDown />
          </NoFocusButtons>
        )}
      </Flex>
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

const NoFocusButtons = styled(Flex)`
  opacity: 0;
`;

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  menuItems: PropTypes.array,
  categories: PropTypes.array,
  translations: PropTypes.object,
  index: PropTypes.number,
};

export default memo(MenuItem);
