import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { theme } from "theme";
import { Divider } from "components/divider";

const Navigation = ({ category, currentCategoryId, onLocation }) => {
  const changeCategory = useCallback(
    (categoryId) => () => {
      onLocation(categoryId);
    },
    [onLocation]
  );

  const currentCategory = useMemo(
    () =>
      category.find((currentValue) => currentValue._id === currentCategoryId),
    [currentCategoryId, category]
  );

  return (
    <Flex
      direction="column"
      pl={theme.spacing(1)}
      width={1}
      flex={1}
      height={1}
      boxSizing="border-box"
    >
      <Text
        fontSize={theme.fontSize(3)}
        mt={theme.spacing(3)}
        mb={theme.spacing(1)}
        fontWeight="bold"
      >
        {currentCategory.name}
      </Text>
      <Divider />
      <Flex overflowX="auto" width={1}>
        {category.map((currentValue) => (
          <Flex key={currentValue._id}>
            <Flex p={theme.spacing(1)}>
              {currentCategoryId === currentValue._id ? (
                <Text onClick={changeCategory(currentValue._id)}>
                  {currentValue.name}
                </Text>
              ) : (
                <Text
                  onClick={changeCategory(currentValue._id)}
                  color="var(--text-grey)"
                >
                  {currentValue.name}
                </Text>
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

Navigation.propTypes = {
  category: PropTypes.array,
  currentCategoryId: PropTypes.string,
  onLocation: PropTypes.func,
};

export default memo(Navigation);
