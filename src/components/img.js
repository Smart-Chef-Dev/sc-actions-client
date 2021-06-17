export const Img = styled.img`
  width: ${(props) => (props.width ? `${100 * props.width}%` : "auto")};
  height: ${(props) => (props.height ? `${100 * props.height}%` : "auto")};

  margin: ${(props) => props.m ?? "0"};
  margin-top: ${(props) => props.mt ?? "0"};
  margin-right: ${(props) => props.mr ?? "0"};
  margin-bottom: ${(props) => props.mb ?? "0"};
  margin-left: ${(props) => props.ml ?? "0"};

  padding: ${(props) => props.p ?? "0"};
  padding-top: ${(props) => props.pt ?? "0"};
  padding-right: ${(props) => props.pr ?? "0"};
  padding-bottom: ${(props) => props.pb ?? "0"};
  padding-left: ${(props) => props.pl ?? "0"};

  overflow-x: ${(props) => props.overflowX ?? "visible"};
  overflow-y: ${(props) => props.overflowY ?? "visible"};

  border-radius: ${(props) => props.borderRadius ?? "0%"};
`;

import { styled } from "@linaria/react";
