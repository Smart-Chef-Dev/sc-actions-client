import { styled } from "@linaria/react";

export const Label = styled.label`
  color: var(--main-text-color);

  padding: ${(props) => props.padding ?? props.p ?? "0"};
  padding-top: ${(props) =>
    props.paddingTop ?? props.pt ?? props.py ?? props.p ?? "0"};
  padding-right: ${(props) =>
    props.paddingRight ?? props.pr ?? props.px ?? props.p ?? "0"};
  padding-bottom: ${(props) =>
    props.paddingBottom ?? props.pb ?? props.py ?? props.p ?? "0"};
  padding-left: ${(props) =>
    props.paddingLeft ?? props.pl ?? props.px ?? props.p ?? "0"};
`;
