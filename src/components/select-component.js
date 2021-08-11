import { memo } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import { InputLabel } from "./input-label";
import {
  DropdownIndicatorSelect,
  selectStyles,
} from "components/select-styles";

const SelectComponent = ({
  name,
  options,
  value,
  onFieldValue,
  placeholder,
  label,
}) => {
  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Select
        placeholder={placeholder}
        options={options}
        components={{ DropdownIndicatorSelect }}
        name={name}
        styles={selectStyles}
        value={value}
        onChange={(option) => {
          onFieldValue(name, option);
        }}
      />
    </>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onFieldValue: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export default memo(SelectComponent);
