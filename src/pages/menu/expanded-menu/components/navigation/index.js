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
    <Flex overflowX="scroll" width={1}>
      {props.category.map((currentValue) => (
        <Flex key={currentValue.id}>
          <Flex p={theme.spacing(1)}>
            {props.currentCategory === currentValue.id ? (
              <Text onClick={changeCategory(currentValue.id)}>
                {currentValue.category}
              </Text>
            ) : (
              <Text
                onClick={changeCategory(currentValue.id)}
                color="var(--text-grey)"
              >
                {currentValue.category}
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
