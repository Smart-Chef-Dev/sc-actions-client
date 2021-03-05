import { memo, useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

import "./styles.css";

const DarkModeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      (localStorage.hasOwnProperty("theme") &&
        localStorage.getItem("theme") === "dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";

    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  return (
    <div className="dark-mode-switcher">
      <DarkModeToggle checked={isDarkMode} size={80} onChange={setIsDarkMode} />
    </div>
  );
};

export default memo(DarkModeSwitcher);
