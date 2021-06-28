import { memo, useCallback, useEffect } from "react";
import { styled } from "@linaria/react";

import { Keys } from "utils/localStorage";
import { useDarkMode } from "contexts/dark-mode-context";

import DarkModeIcon from "assets/icons/dark-mode-switcher/dark-mode-symbol.svg";
import LightModeIcon from "assets/icons/dark-mode-switcher/light-mode-symbol.svg";

const DarkModeSwitcher = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";

    localStorage.setItem(Keys.THEME, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  const handleIconClick = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode]);

  return (
    <Button onClick={handleIconClick} aria-label="dark-mode-switcher">
      {!isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  user-select: none;
  color: var(--main-text-color);
  background-color: transparent;
  border: none;
  outline: none;
`;

export default memo(DarkModeSwitcher);
