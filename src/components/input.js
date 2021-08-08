import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { Label } from "./label";

const Input = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  height = null,
  placeholder = null,
  background = null,
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        height={height}
        placeholder={placeholder}
        background={background}
      />
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  height: PropTypes.string,
  placeholder: PropTypes.string,
  background: PropTypes.string,
};

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.height ?? "30px"};
  border: 1px solid #ddd;
  background: ${(props) => props.background ?? "#eee"};
  outline: none;
  font: inherit;
  padding: 1rem;

  ::placeholder {
    color: var(--text-grey);
    font-size: 13px;
  }
`;

export default memo(Input);
