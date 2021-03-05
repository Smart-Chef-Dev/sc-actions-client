import { memo } from "react";

import "./styles.css";

const Logo = () => {
  return (
    <div className="logo">
      <img alt="logo" />
    </div>
  );
};

export default memo(Logo);
