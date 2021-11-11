import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { formatDistance } from "date-fns";
import * as dateFnsLocales from "date-fns/locale";

import { Languages } from "contexts/translation-context";
import BlockIcon from "assets/icons/screen-block/block-icon.svg";

const ScreenBlock = ({ remainingSeconds = 0, language }) => {
  const formattedTime = useMemo(() => {
    return formatDistance(0, remainingSeconds, {
      includeSeconds: true,
      locale:
        language === Languages.EN
          ? dateFnsLocales["enUS"]
          : dateFnsLocales[Languages[language]],
    });
  }, [remainingSeconds, language]);

  return (
    <ScreenBlockContainer>
      <Icon>
        <BlockIcon />
      </Icon>
      <Time>{formattedTime}</Time>
    </ScreenBlockContainer>
  );
};

const ScreenBlockContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--black-layout-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Icon = styled.div`
  width: 40%;
  fill: var(--main-color);
`;

const Time = styled.div`
  color: white;
`;

ScreenBlock.propTypes = {
  remainingSeconds: PropTypes.number,
  language: PropTypes.string,
};

export default memo(ScreenBlock);
