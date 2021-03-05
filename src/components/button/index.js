import { memo } from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Button = ({ text, classNames, onClick }) => {
  return (
    <input
      className={!classNames ? "button" : `button ${classNames}`}
      type="button"
      value={text}
      onClick={onClick}
    />
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default memo(Button);
