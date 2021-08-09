import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import ErrorText from "./error-text";
import { StyledInput } from "./styled-input";
import { InputLabel } from "./input-label";

const Input = ({
  type = "text",
  label,
  error,
  name,
  value,
  onChange,
  height,
  placeholder = null,
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        height={height}
        error={!!error}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  height: PropTypes.string,
};

export default memo(Input);
