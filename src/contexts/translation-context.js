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
import { useRouterParameters } from "../hooks/useRouterParameters";

const Context = createContext({});

export const Languages = {
  EN: "en",
  RU: "ru",
  PL: "pl",
};
const DEFAULT_LANGUAGE = Languages.RU;

export const useTranslation = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
};

export const TranslationContext = (props) => {
  const strings = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState();
  const [restaurant, setRestaurant] = useState(null);
  const parameters = useRouterParameters();

  const setLanguage = useCallback((language) => {
    localStorage.setItem(Keys.CURRENT_LANGUAGE, language);
    setCurrentLanguage(language);
    strings.current.setLanguage(language);
  }, []);

  useEffect(() => {
    if (!parameters.restaurantId) {
      return;
    }

    (async () => {
      const resp = await fetch(`/api/restaurant/${parameters.restaurantId}`);
      if (!resp.ok) {
        throw new Error("Restaurant not found");
      }
      const data = await resp.json();
      setRestaurant(data);
    })();
  }, [parameters]);

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    setLanguage(Languages[restaurant.language]);
  }, [restaurant, setLanguage]);

  const value = useMemo(() => {
    strings.current = new LocalizedStrings(languages);
    const language =
      localStorage.getItem(Keys.CURRENT_LANGUAGE) ?? DEFAULT_LANGUAGE;

    setLanguage(language);

    return {
      strings: strings.current,
      currentLanguage,
      setLanguage,
    };
  }, [currentLanguage, setLanguage]);

  return <Context.Provider value={value} {...props} />;
};
