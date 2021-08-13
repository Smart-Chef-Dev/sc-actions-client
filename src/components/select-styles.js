import { components } from "react-select";
import InvertedGrayTriangleIcon from "../assets/icons/select/inverted_gray_triangle_icon.svg";

export const selectStyles = {
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
};

export const DropdownIndicatorSelect = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <InvertedGrayTriangleIcon />
    </components.DropdownIndicator>
  );
};
