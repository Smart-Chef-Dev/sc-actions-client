import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { Text } from "./text";
import ErrorText from "./error-text";

const Input = ({
  type = "text",
  label,
  error,
  name,
  value,
  onChange,
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
      {label && <s.Label htmlFor={name}>{label}</s.Label>}
      <s.StyledInput
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
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
};

const s = {
  StyledInput: styled.input`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    border: ${(props) =>
      props.error ? "1px solid var(--error)" : "1px solid #ddd"};
    background: var(--main-bg-color);
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
  Label: styled(Text)`
    color: var(--main-text-color);
    font-size: 10px;
    padding-bottom: 7px;
  `,
};

export default memo(Input);
