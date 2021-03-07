import { memo, createContext, useState, useContext, useMemo } from "react";

const Context = createContext({ isDarkMode: false });

export const useDarkMode = () => useContext(Context);

const DarkModeContext = ({ children }) => {
  const initialState = useMemo(() => {
    return (
      (localStorage.hasOwnProperty("theme") &&
        localStorage.getItem("theme") === "dark") ||
      (!localStorage.hasOwnProperty("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(initialState);

  return (
    <Context.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </Context.Provider>
  );
};

export default memo(DarkModeContext);
