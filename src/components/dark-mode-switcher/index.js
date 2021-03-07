import { memo, useCallback, useEffect, useState } from "react";

import { ReactComponent as DarkModeIcon } from "./dark-mode-symbol.svg";
import { ReactComponent as LightModeIcon } from "./light-mode-symbol.svg";

import "./styles.css";
import { isDarkModeTheme } from "../../utils/is-dark-mode";

const DarkModeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(isDarkModeTheme);
  }, []);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";

    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  const handleIconClick = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="dark-mode-switcher" onClick={handleIconClick}>
      {!isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </div>
  );
};

export default memo(DarkModeSwitcher);
