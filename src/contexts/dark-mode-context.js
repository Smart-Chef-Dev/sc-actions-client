import { createContext, memo, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext({ isDarkMode: false });

export const useDarkMode = () => useContext(Context);

const DarkModeContext = ({ children }) => {
  const initialState = useMemo(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(initialState);

  return (
    <Context.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </Context.Provider>
  );
};

DarkModeContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(DarkModeContext);
