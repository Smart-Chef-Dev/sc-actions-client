import { memo, useCallback } from "react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Button from "components/button";
import { theme } from "theme";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { deleteCategory } from "services/categoriesService";

const DeleteCategoryPopup = ({
  category,
  onToggleHidden,
  restaurantId,
  categories,
  translations,
}) => {
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.setQueryData(
        ["categories", { restaurantId }],
        categories.filter(
          (currentCategory) => currentCategory._id !== category._id
        )
      );
    },
  });

  const cancelRemovalCategory = useCallback(() => {
    onToggleHidden(true);
  }, [onToggleHidden]);

  const removeCategory = useCallback(async () => {
    try {
      await deleteCategoryMutation.mutateAsync({ categoryId: category._id });

      onToggleHidden(true);
    } catch (err) {
      console.log(err);
    }
  }, [category, deleteCategoryMutation, onToggleHidden]);

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
      <Flex width={1} justifyContent="space-between">
        <Button
          background="var(--text-grey)"
          width="auto"
          mb="0"
          onClick={cancelRemovalCategory}
        >
          {translations["cancel"]}
        </Button>
        <Button width="auto" mb="0" onClick={removeCategory}>
          {translations["delete"]}
        </Button>
      </Flex>
    </Flex>
  );
};

DeleteCategoryPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  category: PropTypes.object,
  categories: PropTypes.array,
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
};

export default memo(DeleteCategoryPopup);
