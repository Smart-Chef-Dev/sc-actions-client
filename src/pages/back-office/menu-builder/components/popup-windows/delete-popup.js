import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";

import { theme } from "theme";
import ConfirmationPopup from "components/confirmationPopup/confirmationPopup";
import { deleteMenuItem } from "services/menuItemsService";
import { deleteCategory } from "services/categoriesService";
import { Flex } from "components/flex";

const DeletePopup = ({ menuItem, category, onToggleHidden, translations }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(menuItem ? deleteMenuItem : deleteCategory, {
    onSuccess: () => {
      if (menuItem) {
        const menuItemsKey = [
          "menuItems",
          { categoryId: menuItem.category._id },
        ];
        const menuItemInCache = queryClient.getQueryData(menuItemsKey);

        queryClient.setQueryData(
          menuItemsKey,
          menuItemInCache.filter(
            (currentCategory) => currentCategory._id !== menuItem._id
          )
        );

        return;
      }

      const categoriesKey = [
        "categories",
        { restaurantId: category.restaurant._id },
      ];
      const categoriesInCache = queryClient.getQueryData(categoriesKey);

      queryClient.setQueryData(
        categoriesKey,
        categoriesInCache.filter(
          (currentCategory) => currentCategory._id !== category._id
        )
      );
    },
  });

  const texts = useMemo(
    () =>
      menuItem
        ? [
            {
              text: translations["delete_item"],
              property: {
                fontWeight: "bold",
                fontSize: theme.fontSize(3),
                mb: theme.spacing(3),
              },
            },
            {
              text: translations["are_you_sure_you_want_to_delete"],
            },
            {
              text: menuItem.name,
              property: {
                color: "var(--main-color)",
              },
            },
            {
              text: translations["deleted_items_cannot_be_recovered"],
              property: {
                textAlign: "center",
              },
            },
          ]
        : [
            {
              text: translations["delete_category"],
              property: {
                mb: theme.spacing(2),
                fontSize: theme.fontSize(3),
                fontWeight: "bold",
              },
            },
            {
              text: `${translations["are_you_sure_you_want_to_delete_1"]} ${category.name} ${translations["are_you_sure_you_want_to_delete_2"]}`,
              property: {
                mb: theme.spacing(2),
                px: theme.spacing(3),
                boxSizing: "border-box",
              },
            },
            {
              text: translations["deleted_data_cannot_be_recovered"],
              property: {
                px: theme.spacing(1),
                boxSizing: "border-box",
              },
            },
          ],
    [translations, menuItem, category]
  );

  const removeMenuItem = useCallback(async () => {
    try {
      const requestData = menuItem
        ? { menuItemId: menuItem._id }
        : { categoryId: category._id };

      await mutation.mutateAsync(requestData);
    } catch (err) {
      console.log(err);
    }
  }, [menuItem, category, mutation]);

  return (
    <Flex width={1} height={1} p={theme.spacing(3)} boxSizing="border-box">
      <ConfirmationPopup
        texts={texts}
        onToggleHidden={onToggleHidden}
        actionButton={removeMenuItem}
        nameContinueButton={translations["delete"]}
        nameCancelButton={translations["cancel"]}
        buttonWidth="auto"
      />
    </Flex>
  );
};

DeletePopup.propTypes = {
  onToggleHidden: PropTypes.func,
  menuItem: PropTypes.object,
  category: PropTypes.object,
  translations: PropTypes.object,
};

export default memo(DeletePopup);
