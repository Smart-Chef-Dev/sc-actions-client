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
          Delete Category
        </Text>
        <Text mb={theme.spacing(1)} textAlign="center">
          Are you sure you want to delete {category.name} and all category
          items?
        </Text>
        <Text>Deleted data cannot be recovered!</Text>
      </Flex>
      <Flex width={1} justifyContent="space-between">
        <Button
          background="var(--text-grey)"
          width="none"
          mb="0"
          onClick={cancelRemovalCategory}
        >
          Cancel
        </Button>
        <Button width="auto" mb="0" onClick={removeCategory}>
          Delete
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
};

export default memo(DeleteCategoryPopup);
