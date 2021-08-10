import { memo } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

import { InputLabel } from "./input-label";
import {
  DropdownIndicatorSelect,
  selectStyles,
} from "components/select-styles";
import { Text } from "./text";
import { theme } from "../theme";
import { Flex } from "./flex";
import { Checkbox } from "./checkbox";

const multiselectStyles = {
  ...selectStyles,
  option: () => ({
    fontSize: 13,
    padding: 16,
    backgroundColor: "var(--main-bg-color)",
  }),
};

const Option = ({ ...props }) => {
  return (
    <components.Option {...props}>
      <Flex alignItems="center" justifyContent="space-between" width={1}>
        <label>{props.value}</label>
        {props.value !== props.options[props.options.length - 1].value && (
          <Checkbox type="checkbox" checked={props.isSelected} />
        )}
      </Flex>
    </components.Option>
  );
};

const Control = ({ ...props }) => {
  const numberOfSelectedValues = props.getValue().length;

  return (
    <components.Control {...props}>
      <Text ml={theme.spacing(1)} fontSize={theme.fontSize(0)}>
        Select ({numberOfSelectedValues})
      </Text>
      {props.children}
    </components.Control>
  );
};

const Multiselect = ({
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
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        controlShouldRenderValue={false}
        isSearchable={false}
        placeholder={placeholder}
        options={options}
        components={{ DropdownIndicatorSelect, Control, Option }}
        name={name}
        styles={multiselectStyles}
        value={value}
        onChange={(option) => {
          onFieldValue(name, option);
        }}
      />
    </>
  );
};

Multiselect.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.array,
  onFieldValue: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

Control.propTypes = {
  getValue: PropTypes.func,
  children: PropTypes.array,
};

Option.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  isSelected: PropTypes.bool,
};

export default memo(Multiselect);
