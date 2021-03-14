import { memo } from "react";
import { styled } from "@linaria/react";

import LogoIcon from "./logo.svg";

const Logo = () => {
  return (
    <LogoContainer>
      <Img>
        <LogoIcon />
      </Img>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div`
  width: 18em;
  fill: var(--main-text-color);
`;

export default memo(Logo);
