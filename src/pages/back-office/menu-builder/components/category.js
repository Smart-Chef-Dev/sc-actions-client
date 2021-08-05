import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuItems from "./menuItems";
import { theme } from "theme";
import GrayTriangle from "assets/icons/back-office/gray_triangle.svg";
import RedTriangle from "assets/icons/back-office/red_triangle.svg";

const Category = ({ category, onExpandedCategoryId, expandedCategoryId }) => {
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
        onClick={expandCategory}
        p={theme.spacing(1)}
        pl={theme.spacing(4)}
        boxSizing="border-box"
      >
        <Text>{category.name}</Text>
        <Flex>
          {category._id === expandedCategoryId ? (
            <RedTriangle />
          ) : (
            <GrayTriangle />
          )}
        </Flex>
      </Flex>
      {category._id === expandedCategoryId && (
        <MenuItems categoryId={category._id} />
      )}
    </Flex>
  );
};

Category.propTypes = {
  category: PropTypes.object,
  onExpandedCategoryId: PropTypes.func,
  expandedCategoryId: PropTypes.string,
};

export default memo(Category);
