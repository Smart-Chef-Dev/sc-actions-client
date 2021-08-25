import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  createContext,
  useContext,
} from "react";
import LocalizedStrings from "react-localization";

import { Keys } from "utils/localStorage";
import { languages } from "translations";

export const Context = createContext({});

export const Languages = {
  EN: "en",
  RU: "ru",
};
const DEFAULT_LANGUAGE = Languages.RU;

export const useTranslation = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
};

export const useUpdateLanguage = (language) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "useUpdateLanguage must be used within a TranslationProvider"
    );
  }

  if (!language || !Languages[language]) {
    return;
  }

  if (localStorage.getItem(Keys.CURRENT_LANGUAGE) === Languages[language]) {
    return;
  }

  localStorage.setItem(Keys.CURRENT_LANGUAGE, Languages[language]);
  context.setLanguage(Languages[language]);
};

export const TranslationContext = (props) => {
  const strings = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState();

  const setLanguage = useCallback((language) => {
    setCurrentLanguage(language);
    strings.current.setLanguage(language);
  }, []);

  useEffect(() => {
    strings.current = new LocalizedStrings(languages);

    const language =
      localStorage.getItem(Keys.CURRENT_LANGUAGE) ?? DEFAULT_LANGUAGE;

    setLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      strings: strings.current,
      currentLanguage,
      setLanguage,
    }),
    [currentLanguage, setLanguage]
  );

  return <Context.Provider value={value} {...props} />;
};
