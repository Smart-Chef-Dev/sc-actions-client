import { memo } from "react";
import PropTypes from "prop-types";
import { StyledInput } from "./styled-input";
import { InputLabel } from "./input-label";
import { styled } from "@linaria/react";

const Select = ({ name, options, label }) => {
  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <StyledInput name={name} component="select">
        {options.map((option, i) => (
          <Option value={option} key={i}>
            {option}
          </Option>
        ))}
      </StyledInput>
    </>
  );
};

const Option = styled.option`
  padding: 16px;
`;

Select.propTypes = {
  options: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default memo(Select);
