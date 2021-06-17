import { memo, useCallback } from "react";
import { useLocation } from "wouter";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { theme } from "theme";

const Navigation = (props) => {
  const [, setLocation] = useLocation();

  const changeCategory = useCallback(
    (categoryId) => () => {
      setLocation(categoryId);
    },
    [setLocation]
  );

  return (
    <Flex overflowX="auto" width={1}>
      {props.category.map((currentValue) => (
        <Flex key={currentValue._id}>
          <Flex p={theme.spacing(1)}>
            {props.currentCategory === currentValue._id ? (
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
  );
};

Navigation.propTypes = {
  category: PropTypes.array,
  currentCategory: PropTypes.string,
};

export default memo(Navigation);
