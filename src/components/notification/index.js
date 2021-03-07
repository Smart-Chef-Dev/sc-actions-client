import { memo } from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Notification = ({ text }) => {
  return (
    <div className="notification-container">
      <div className="notification-popup">{text}</div>
    </div>
  );
};

Notification.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default memo(Notification);
