import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { Label } from "./label";

const InputFormik = ({ type = "text", label, name, value, onChange, id }) => {
  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <StyledInput
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

InputFormik.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  border: 1px solid #ddd;
  background: #eee;
  outline: none;
  font: inherit;
`;

export default memo(InputFormik);
