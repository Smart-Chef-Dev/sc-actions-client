import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { theme } from "theme";
import { useMutation, useQueryClient } from "react-query";
import { deleteCategory } from "services/categoriesService";
import PopupWindowControlButton from "../popup-window-control-button";

const DeleteCategoryPopup = ({
  category,
  onToggleHidden,
  restaurantId,
  translations,
}) => {
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      const dataInCache = queryClient.getQueryData([
        "categories",
        { restaurantId },
      ]);

      queryClient.setQueryData(
        ["categories", { restaurantId }],
        dataInCache.filter(
          (currentCategory) => currentCategory._id !== category._id
        )
      );
    },
  });

  const removeCategory = useCallback(async () => {
    try {
      await deleteCategoryMutation.mutateAsync({ categoryId: category._id });
    } catch (err) {
      console.log(err);
    }
  }, [category, deleteCategoryMutation]);

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      p={theme.spacing(4)}
      pt={theme.spacing(3)}
      boxSizing="border-box"
      width={1}
      height={1}
    >
      <Flex direction="column" alignItems="center">
        <Text
          mb={theme.spacing(2)}
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
        >
          {translations["delete_category"]}
        </Text>
        <Text mb={theme.spacing(1)} textAlign="center">
          {translations["are_you_sure_you_want_to_delete_1"]} {category.name}
          {translations["are_you_sure_you_want_to_delete_2"]}
        </Text>
        <Text textAlign="center">
          {translations["deleted_data_cannot_be_recovered"]}
        </Text>
      </Flex>
      <PopupWindowControlButton
        onToggleHidden={onToggleHidden}
        translations={translations}
        buttonName={translations["delete"]}
        buttonAction={removeCategory}
        buttonWidth="auto"
      />
    </Flex>
  );
};

DeleteCategoryPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  category: PropTypes.object,
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
};

export default memo(DeleteCategoryPopup);
