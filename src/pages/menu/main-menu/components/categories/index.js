import { memo } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Category from "../category";

const Categories = ({ restaurantId, tableId, onLocation, categories }) => {
  return (
    <Flex width={1} direction="column" overflowY="auto">
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
  );
};

Categories.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
  categories: PropTypes.object,
};

export default memo(Categories);
