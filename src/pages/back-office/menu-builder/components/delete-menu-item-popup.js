import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Button from "components/button";
import { theme } from "theme";
import { deleteMenuItem } from "services/menuItemsService";

const DeleteMenuItemPopup = ({ menuItem, menuItems, onToggleHidden }) => {
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

  const cancelRemovalMenuItem = useCallback(() => {
    onToggleHidden(true);
  }, [onToggleHidden]);

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
          Delete Item
        </Text>
        <Text>Are you sure you want to delete</Text>
        <Text color="var(--main-color)">{menuItem.name}</Text>
        <Text>Deleted items cannot be recovered!</Text>
      </Flex>
      <Flex width={1} justifyContent="space-between">
        <Button
          background="var(--text-grey)"
          width="auto"
          mb="0"
          onClick={cancelRemovalMenuItem}
        >
          Cancel
        </Button>
        <Button width="auto" mb="0" onClick={removeMenuItem}>
          Delete
        </Button>
      </Flex>
    </Flex>
  );
};

DeleteMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.bool,
  menuItem: PropTypes.object,
  menuItems: PropTypes.array,
};

export default memo(DeleteMenuItemPopup);
