import { Fragment, memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { theme } from "theme";
import { Divider } from "components/divider";
import CategoriesLoader from "components/loaders/expanded-menu/categories-loader";

const Navigation = ({ categories, currentCategoryId, onLocation }) => {
  const { data, isLoading } = categories;

  const changeCategory = useCallback(
    (categoryId) => () => {
      onLocation(categoryId);
    },
    [onLocation]
  );

  const category = useMemo(
    () =>
      !isLoading &&
      data.find((currentValue) => currentValue._id === currentCategoryId),
    [currentCategoryId, data, isLoading]
  );

  return !isLoading ? (
    <Flex direction="column" height={1} width={1}>
      <Flex
        height={1}
        width={1}
        direction="column"
        ml={theme.spacing(1)}
        flex={1}
      >
        <Text
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
          my={theme.spacing(1)}
        >
          {category.name}
        </Text>
        <Divider />
      </Flex>
      <Flex height={1} width={1} pl={theme.spacing(1)} boxSizing="border-box">
        <Flex overflowX="auto">
          {data.map((currentCategory) => (
            <Fragment key={currentCategory._id}>
              {currentCategoryId === currentCategory._id ? (
                <Text
                  onClick={changeCategory(currentCategory._id)}
                  p={theme.spacing(1)}
                >
                  {currentCategory.name}
                </Text>
              ) : (
                <Text
                  onClick={changeCategory(currentCategory._id)}
                  color="var(--text-grey)"
                  p={theme.spacing(1)}
                >
                  {currentCategory.name}
                </Text>
              )}
            </Fragment>
          ))}
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <CategoriesLoader quantity={12} />
  );
};

Navigation.propTypes = {
  categories: PropTypes.object,
  currentCategoryId: PropTypes.string,
  onLocation: PropTypes.func,
};

export default memo(Navigation);
