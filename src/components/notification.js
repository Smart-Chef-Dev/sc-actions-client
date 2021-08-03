import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

const Notification = ({ children, background }) => {
  return (
    <Container>
      <Popup background={background}>{children}</Popup>
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
  width: 250px;
  height: 200px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.background ?? "00"};
`;

Notification.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  background: PropTypes.string,
};

export default memo(Notification);
