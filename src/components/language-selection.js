import { memo, useCallback, useContext, useMemo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { Context, Languages } from "../contexts/translation-context";
import { theme } from "../theme";
import { Flex } from "./flex";
import { Keys } from "../utils/localStorage";

const LanguageSelection = ({ text }) => {
  const context = useContext(Context);

  const languages = useMemo(() => {
    const currentLanguage = localStorage.getItem(Keys.CURRENT_LANGUAGE);
    let languagesTmp = [];

    for (const key in Languages) {
      if (currentLanguage === Languages[key]) {
        continue;
      }

      languagesTmp = [...languagesTmp, Languages[key]];
    }

    return languagesTmp;

    // should update when context changes
    // eslint-disable-next-line
  }, [context]);

  const changeLanguage = useCallback(
    (lang) => () => {
      localStorage.setItem(Keys.CURRENT_LANGUAGE, lang);
      context.setLanguage(lang);
    },
    [context]
  );

  return (
    <Flex>
      <Text fontSize={theme.fontSize(0)}>{text}</Text>
      <Flex>
        {languages.map((l, i) => (
          <Language key={l} onClick={changeLanguage(l)}>
            {i !== languages.length - 1 ? ` ${l},` : ` ${l}`}
          </Language>
        ))}
      </Flex>
    </Flex>
  );
};

LanguageSelection.propTypes = {
  text: PropTypes.string,
};

const Language = styled.pre`
  font-size: 13px;
  margin: 0;

  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export default memo(LanguageSelection);
