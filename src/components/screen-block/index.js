import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/esm/locale";

import BlockIcon from "./block-icon.svg";

const ScreenBlock = ({ remainingSeconds = 0 }) => {
  const formattedTime = useMemo(() => {
    return formatDistance(0, remainingSeconds, {
      includeSeconds: true,
      locale: ru,
    });
  }, [remainingSeconds]);

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
};

export default memo(ScreenBlock);
