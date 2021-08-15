import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

import { InputLabel } from "./input-label";
import { Text } from "./text";
import { theme } from "../theme";
import { Flex } from "./flex";
import { Checkbox } from "./checkbox";

const selectStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided, state) => ({
    ...provided,
    height: 48,
    border: "1px solid #E5E5EA",
    boxShadow: state.menuIsOpen && "0px 3px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: state.menuIsOpen ? "3px 3px 0px 0px" : 3,
    "&:hover": {
      border: "1px solid #ddd",
    },
  }),
  menu: (provided) => ({
    ...provided,
    margin: 0,
    borderRadius: "0px 0px 3px 3px",
    border: "1px solid #E5E5EA",
    borderTop: 0,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: 13,
    lineHeight: 16,
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "2px 16px",
  }),
  indicatorSeparator: () => ({}),
  placeholder: (provided) => ({
    ...provided,
    fontSize: 13,
    lineHeight: 16,
    color: "#C7C7CC",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 13,
    padding: 16,
    backgroundColor: state.isSelected && "var(--main-color)",
    "&:hover": {
      backgroundColor:
        !state.isSelected && "var(--red-color-for-selected-object)",
    },
    ":active": {},
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  input: (provided) => ({
    ...provided,
    fontSize: 13,
  }),
};

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
        {!props.data.isButton && (
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
        {props.selectProps.translations["select"] ?? "Select"}(
        {numberOfSelectedValues})
      </Text>
      {props.children}
    </components.Control>
  );
};

const NoOptionsMessage = ({ ...props }) => {
  return (
    <Text
      width={1}
      justifyContent="center"
      p={theme.spacing(1)}
      boxSizing="border-box"
      fontSize={theme.fontSize(0)}
    >
      {props.selectProps.translations["no_options"] ?? "No options"}
    </Text>
  );
};

const SelectComponent = ({
  name,
  options,
  value,
  onFieldValue,
  placeholder,
  label,
  translations,
  isMultiSelect = false,
}) => {
  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Select
        isMulti={isMultiSelect}
        closeMenuOnSelect={!isMultiSelect}
        hideSelectedOptions={!isMultiSelect}
        controlShouldRenderValue={!isMultiSelect}
        placeholder={placeholder}
        options={options}
        name={name}
        translations={translations}
        styles={isMultiSelect ? multiselectStyles : selectStyles}
        value={value}
        components={useMemo(
          () =>
            isMultiSelect
              ? { Control, Option, NoOptionsMessage }
              : { NoOptionsMessage },
          [isMultiSelect]
        )}
        onChange={useCallback(
          (option) => onFieldValue(name, option),
          [name, onFieldValue]
        )}
      />
    </>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onFieldValue: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  translations: PropTypes.object,
  isMultiSelect: PropTypes.bool,
};

Control.propTypes = {
  getValue: PropTypes.func,
  children: PropTypes.array,
  selectProps: PropTypes.object,
  translations: PropTypes.object,
};

Option.propTypes = {
  value: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  data: PropTypes.object,
  isButton: PropTypes.bool,
  isSelected: PropTypes.bool,
};

NoOptionsMessage.propTypes = {
  selectProps: PropTypes.object,
  translations: PropTypes.object,
};

export default memo(SelectComponent);
