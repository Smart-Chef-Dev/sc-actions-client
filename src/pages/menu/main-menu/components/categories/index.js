import { memo } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Category from "./components/category";
import CategoriesLoader from "components/loaders/main-menu/categories-loader";
import { Divider } from "components/divider";
import { theme } from "theme";

const Categories = ({ restaurantId, tableId, onLocation, categories }) => {
  return !categories.isLoading ? (
    <Flex
      width={1}
      height={1}
      direction="column"
      overflowY="auto"
      overflowX="hidden"
    >
      {categories.data.map((currentCategory, index) => (
        <>
          <Category
            key={currentCategory._id}
            restaurantId={restaurantId}
            tableId={tableId}
            category={currentCategory}
            onLocation={onLocation}
          />
          {index !== categories.data.length - 1 && (
            <Divider ml={theme.spacing(1)} mb={theme.spacing(1)} />
          )}
        </>
      ))}
    </Flex>
  ) : (
    <Flex
      direction="column"
      height={1}
      width={1}
      overflowX="hidden"
      overflowY="hidden"
    >
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
