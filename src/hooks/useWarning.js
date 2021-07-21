import { createPortal } from "react-dom";
import { useCallback, useState } from "react";
import Warning from "../components/warning";

export const useWarning = (text, continueButton) => {
  const [isHidden, toggleHidden] = useState(true);

  const renderNotification = useCallback(() => {
    return !isHidden
      ? createPortal(
          <Warning
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
