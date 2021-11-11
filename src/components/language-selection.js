import { memo, useCallback, useMemo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { Languages, useTranslation } from "../contexts/translation-context";
import { theme } from "../theme";
import { Flex } from "./flex";

const LanguageSelection = ({ text }) => {
  const { setLanguage } = useTranslation();

  const languages = useMemo(() => Object.values(Languages), []);

  const changeLanguage = useCallback(
    (lang) => () => {
      setLanguage(lang);
    },
    [setLanguage]
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
