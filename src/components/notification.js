import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

const Notification = ({ children, background, width, height }) => {
  return (
    <Container onClick={useCallback((e) => e.stopPropagation, [])}>
      <Popup background={background} width={width} height={height}>
        {children}
      </Popup>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--black-layout-color);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  width: ${(props) => props.width ?? "250px"};
  height: ${(props) => props.height ?? "200px"};
  border-radius: 25px;
  display: flex;
  background: ${(props) => props.background ?? "transparent"};
`;

Notification.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  background: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default memo(Notification);
