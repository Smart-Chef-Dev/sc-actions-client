import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import ErrorText from "./error-text";
import { StyledInput } from "./styled-input";
import { InputLabel } from "./input-label";
import { Flex } from "./flex";
import { styled } from "@linaria/react";

const Input = ({
  type = "text",
  label,
  error,
  name,
  value,
  onChange,
  height,
  placeholder = null,
  disabled = false,
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Flex direction="column" width={1} height={1} position="relative">
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        height={height}
        error={!!error}
        disabled={disabled}
      />
      {error && <ErrorTextInput>{error}</ErrorTextInput>}
    </Flex>
  );
};

const ErrorTextInput = styled(ErrorText)`
  position: absolute;
  bottom: -13px;
`;

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
};

export default memo(Input);
