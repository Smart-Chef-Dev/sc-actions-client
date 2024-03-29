import { styled } from "@linaria/react";

import { Flex } from "components/flex";

export const Text = styled(Flex)`
  font-size: ${(props) => props.fontSize ?? "1rem"};
  text-transform: ${(props) => props.textTransform ?? "none"};
  font-family: ${(props) => props.fontFamily ?? "Arial"};
  font-weight: ${(props) => props.fontWeight ?? "normal"};
  text-align: ${(props) => props.textAlign ?? "auto"};

  color: ${(props) => props.color ?? "var(--main-text-color)"};
`;
