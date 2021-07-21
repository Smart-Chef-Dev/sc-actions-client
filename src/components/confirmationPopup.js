import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import Button from "./button";
import { Flex } from "./flex";
import { Text } from "./text";
import { theme } from "../theme";
import { useTranslation } from "../contexts/translation-context";

const ConfirmationPopup = ({ text, onToggleHidden, continueButton }) => {
  const {
    strings: { confirmationPopup: translations },
  } = useTranslation();

  const continueOperation = useCallback(() => {
    continueButton();
    onToggleHidden(true);
  }, [continueButton, onToggleHidden]);

  const cancelOperation = useCallback(() => {
    onToggleHidden(true);
  }, [onToggleHidden]);

  return (
    <Container>
      <Popup justifyContent="center" alignItems="center" direction="column">
        <Text
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          mb={theme.spacing(1)}
        >
          {text}
        </Text>
        <Button onClick={continueOperation}>{translations["continue"]}</Button>
        <Button onClick={cancelOperation}>{translations["cancel"]}</Button>
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

const Popup = styled(Flex)`
  width: 250px;
  height: 200px;
  border-radius: 25px;
  align-items: center;
  background: var(--main-bg-color);
`;

ConfirmationPopup.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onToggleHidden: PropTypes.func,
  continueButton: PropTypes.func,
};

export default memo(ConfirmationPopup);