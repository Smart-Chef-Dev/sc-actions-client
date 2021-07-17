import { memo } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Category from "./components/category";
import CategoriesLoader from "components/loaders/main-menu/categories-loader";

const Categories = ({ restaurantId, tableId, onLocation, categories }) => {
  return !categories.isLoading ? (
    <Flex
      width={1}
      height={1}
      direction="column"
      overflowY="auto"
      overflowX="hidden"
    >
      {categories.data.map((currentCategory) => (
        <Category
          key={currentCategory._id}
          restaurantId={restaurantId}
          tableId={tableId}
          category={currentCategory}
          onLocation={onLocation}
        />
      ))}
    </Flex>
  ) : (
    <Flex direction="column" height={1} overflowX="hidden">
      <CategoriesLoader quantity={7} />
    </Flex>
  );
};

Categories.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
  categories: PropTypes.object,
};

export default memo(Categories);
