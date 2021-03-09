import { memo } from "react";
import { styled } from "@linaria/react";

import { useDarkMode } from "../../contexts/dark-mode-context";
import LightLogo from "./logo.svg";
import DarkLogo from "./logo-dark.svg";

const Logo = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <LogoContainer>
      <Img>{isDarkMode ? <DarkLogo /> : <LightLogo />}</Img>
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
  width: 20em;
`;

export default memo(Logo);
