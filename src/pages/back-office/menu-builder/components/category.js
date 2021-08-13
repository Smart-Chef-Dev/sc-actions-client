import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuItems from "./menuItems";
import { theme } from "theme";
import { swapCategories } from "services/categoriesService";
import SwapElement from "./swap-element";
import CategoryControlButtons from "./category-control-buttons";

const Category = ({
  category,
  onExpandedCategoryId,
  expandedCategoryId,
  categories,
  restaurantId,
  index,
  translations,
}) => {
  const expandCategory = useCallback(
    () =>
      onExpandedCategoryId((oldExpandedCategoryId) =>
        oldExpandedCategoryId === category._id ? "" : category._id
      ),
    [category._id, onExpandedCategoryId]
  );

  return (
    <Flex width={1} direction="column" pb={0} boxSizing="border-box">
      <Flex
        width={1}
        justifyContent="space-between"
        alignItems="center"
        p={theme.spacing(1)}
        pl={theme.spacing(3)}
        boxSizing="border-box"
        onClick={expandCategory}
      >
        <Flex alignItems="center">
          <SwapElement
            index={index}
            element={category}
            isButtonsDisplay={true}
            swapService={swapCategories}
            queryKey={["categories", { restaurantId }]}
          />
          <Text>{category.name}</Text>
        </Flex>
        <CategoryControlButtons
          category={category}
          categories={categories}
          translations={translations}
          restaurantId={restaurantId}
          expandedCategoryId={expandedCategoryId}
        />
      </Flex>
      {category._id === expandedCategoryId && (
        <MenuItems
          categoryId={category._id}
          categories={categories}
          translations={translations}
        />
      )}
    </Flex>
  );
};

Category.propTypes = {
  category: PropTypes.object,
  categories: PropTypes.array,
  onExpandedCategoryId: PropTypes.func,
  expandedCategoryId: PropTypes.string,
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
  index: PropTypes.number,
};

export default memo(Category);
