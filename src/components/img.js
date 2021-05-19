import { styled } from "@linaria/react";

export const Img = styled.img`
  width: ${(props) => (props.width ? `${100 * props.width}%` : "auto")};
  height: ${(props) => (props.height ? `${100 * props.height}%` : "auto")};

  margin: ${(props) => props.margin ?? props.m ?? "0"};
  margin-top: ${(props) =>
    props.marginTop ?? props.mt ?? props.marginY ?? props.my ?? props.m ?? "0"};
  margin-right: ${(props) =>
    props.marginRight ??
    props.mr ??
    props.marginX ??
    props.mx ??
    props.m ??
    "0"};
  margin-bottom: ${(props) =>
    props.marginBottom ??
    props.mb ??
    props.marginY ??
    props.my ??
    props.m ??
    "0"};
  margin-left: ${(props) =>
    props.marginLeft ??
    props.ml ??
    props.marginX ??
    props.mx ??
    props.m ??
    "0"};

  padding: ${(props) => props.padding ?? props.p ?? "0"};
  padding-top: ${(props) =>
    props.paddingTop ?? props.pt ?? props.py ?? props.p ?? "0"};
  padding-right: ${(props) =>
    props.paddingRight ?? props.pr ?? props.px ?? props.p ?? "0"};
  padding-bottom: ${(props) =>
    props.paddingBottom ?? props.pb ?? props.py ?? props.p ?? "0"};
  padding-left: ${(props) =>
    props.paddingLeft ?? props.pl ?? props.px ?? props.p ?? "0"};

  overflow-x: ${(props) => props.overflowX ?? "visible"};
  overflow-y: ${(props) => props.overflowY ?? "visible"};

  border-radius: ${(props) => props.borderRadius ?? "0%"};
`;