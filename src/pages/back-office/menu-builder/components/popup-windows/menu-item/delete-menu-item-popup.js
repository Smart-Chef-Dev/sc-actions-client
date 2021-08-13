import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { theme } from "theme";
import { deleteMenuItem } from "services/menuItemsService";
import PopupWindowControlButton from "../popup-window-control-button";

const DeleteMenuItemPopup = ({
  menuItem,
  menuItems,
  onToggleHidden,
  translations,
}) => {
  const queryClient = useQueryClient();
  const deleteMenuItemMutation = useMutation(deleteMenuItem, {
    onSuccess: () => {
      queryClient.setQueryData(
        ["menuItems", { categoryId: menuItem.category._id }],
        menuItems.filter(
          (currentCategory) => currentCategory._id !== menuItem._id
        )
      );
    },
  });

  const removeMenuItem = useCallback(async () => {
    try {
      await deleteMenuItemMutation.mutateAsync({ menuItemId: menuItem._id });

      onToggleHidden(true);
    } catch (err) {
      console.log(err);
    }
  }, [menuItem, deleteMenuItemMutation, onToggleHidden]);

  return (
    <Flex
      py={theme.spacing(2)}
      px={theme.spacing(4)}
      boxSizing="border-box"
      direction="column"
      justifyContent="space-between"
      width={1}
      height={1}
    >
      <Flex direction="column" width={1} alignItems="center">
        <Text
          fontWeight="bold"
          fontSize={theme.fontSize(3)}
          mb={theme.spacing(3)}
        >
          {translations["delete_item"]}
        </Text>
        <Text>{translations["are_you_sure_you_want_to_delete"]}</Text>
        <Text color="var(--main-color)">{menuItem.name}</Text>
        <Text textAlign="center">
          {translations["deleted_items_cannot_be_recovered"]}
        </Text>
      </Flex>
      <PopupWindowControlButton
        onToggleHidden={onToggleHidden}
        translations={translations}
        buttonName={translations["create"]}
        buttonAction={removeMenuItem}
        buttonWidth="auto"
      />
    </Flex>
  );
};

DeleteMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.bool,
  menuItem: PropTypes.object,
  menuItems: PropTypes.array,
  translations: PropTypes.object,
};

export default memo(DeleteMenuItemPopup);
