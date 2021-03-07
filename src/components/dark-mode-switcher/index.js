import { memo, useCallback, useEffect } from "react";

import { ReactComponent as DarkModeIcon } from "./dark-mode-symbol.svg";
import { ReactComponent as LightModeIcon } from "./light-mode-symbol.svg";
import { useDarkMode } from "../../contexts/dark-mode-context";

import "./styles.css";

const DarkModeSwitcher = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";

    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  const handleIconClick = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode]);

  return (
    <div className="dark-mode-switcher" onClick={handleIconClick}>
      {!isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </div>
  );
};

export default memo(DarkModeSwitcher);
