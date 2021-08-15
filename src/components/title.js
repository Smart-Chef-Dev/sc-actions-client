import { memo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "./flex";
import { Text } from "./text";

const Title = ({ title }) => {
  return (
    <s.Container>
      <s.ContainerText>
        <s.Title color="var(--main-bg-color)">{title}</s.Title>
        <s.Rhombus />
      </s.ContainerText>
    </s.Container>
  );
};

const s = {
  ContainerText: styled(Flex)`
    position: absolute;
    background: #16467b;
    padding: 7px 4px 7px 7px;
    border-radius: 5px;
    white-space: nowrap;
    top: -33px;
    left: -12px;
  `,
  Container: styled(Flex)`
    position: absolute;
  `,
  Rhombus: styled(Flex)`
    position: absolute;
    left: 15px;
    bottom: -4px;
    background: #16467b;
    height: 10px;
    width: 10px;
    transform: matrix(0.72, 0.61, -0.78, 0.72, 0, 0);
  `,
  Title: styled(Text)`
    font-size: 9px;
  `,
};

Title.propTypes = {
  title: PropTypes.string,
};

export default memo(Title);
