import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import { Flex } from "./flex";

const Slider = ({ value, min = 0, max = 1024, onChange }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(+e.target.value);
    },
    [onChange]
  );

  return (
    <Flex width={1}>
      <Number>{min}</Number>
      <Range
        value={value}
        type="range"
        min={min}
        max={max}
        onChange={handleChange}
      />
      <Number>{max}</Number>
    </Flex>
  );
};

Slider.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

const Number = styled.div`
  color: var(--main-text-color);
`;

const Range = styled.input`
  width: 100%;
`;

export default memo(Slider);
