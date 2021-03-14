import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

const Notification = ({ text }) => {
  return (
    <Container>
      <Popup>{text}</Popup>
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
  width: 200px;
  height: 150px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

Notification.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default memo(Notification);
