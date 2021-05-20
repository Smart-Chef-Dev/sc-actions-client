import { memo, useCallback } from "react";
import { useLocation } from "wouter";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Label } from "components/label";
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
    <Flex>
      {props.category.map((currentValue) => (
        <Flex key={currentValue.id}>
          <Flex p={theme.spacing(1)}>
            {props.currentCategory === currentValue.id ? (
              <Label onClick={changeCategory(currentValue.id)}>
                {currentValue.category}
              </Label>
            ) : (
              <s.DarkenedText onClick={changeCategory(currentValue.id)}>
                {currentValue.category}
              </s.DarkenedText>
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

const s = {
  DarkenedText: styled(Flex)`
    color: var(--grey);
  `,
};

export default memo(Navigation);
