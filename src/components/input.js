import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import ErrorText from "./error-text";
import { InputLabel } from "./input-label";
import { Flex } from "./flex";

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
      <s.Input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        height={height}
        error={error}
        disabled={disabled}
      />
      {error && <s.ErrorText>{error}</s.ErrorText>}
    </Flex>
  );
};

const s = {
  ErrorText: styled(ErrorText)`
    position: absolute;
    bottom: -13px;
  `,
  Input: styled.input`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: ${(props) => props.height ?? "48px"};
    border: ${(props) =>
      props.error ? "1px solid var(--error)" : "1px solid #ddd"};
    background: ${(props) =>
      props.disabled
        ? "var(--grey-color-for-selected-object)"
        : "var(--main-bg-color)"};
    outline: none;
    font: inherit;
    padding: 1rem;
    border-radius: 3px;
    font-size: 13px;
    color: var(--label-color);

    ::placeholder {
      color: var(--text-grey);
      font-size: 13px;
    }

    :focus {
      border: ${(props) =>
        props.error
          ? "1px solid var(--error)"
          : "1px solid var(--label-color)"};
    }
  `,
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
  disabled: PropTypes.bool,
};

export default memo(Input);
