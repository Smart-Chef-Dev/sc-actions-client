import { memo } from "react";

import { useDarkMode } from "../../contexts/dark-mode-context";
import { ReactComponent as LightLogo } from "./logo.svg";
import { ReactComponent as DarkLogo } from "./logo-dark.svg";

import "./styles.css";

const Logo = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="logo">
      <div>{isDarkMode ? <DarkLogo /> : <LightLogo />}</div>
    </div>
  );
};

export default memo(Logo);
