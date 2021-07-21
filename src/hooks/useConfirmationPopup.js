import { createPortal } from "react-dom";
import { useCallback, useState } from "react";
import ConfirmationPopup from "../components/confirmationPopup";

export const useConfirmationPopup = (text, continueButton) => {
  const [isHidden, toggleHidden] = useState(true);

  const renderNotification = useCallback(() => {
    return !isHidden
      ? createPortal(
          <ConfirmationPopup
            text={text}
            onToggleHidden={toggleHidden}
            continueButton={continueButton}
          />,
          document.body
        )
      : null;
  }, [isHidden, text, continueButton]);

  const showNotification = useCallback(() => {
    toggleHidden(false);
  }, []);

  return { renderNotification, showNotification };
};
