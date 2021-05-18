import { styled } from "@linaria/react";

export default styled.h1`
  margin-top: ${(props) => props.marginTop ?? "0.67em"};
  text-align: center;
  color: var(--main-text-color);
`;
