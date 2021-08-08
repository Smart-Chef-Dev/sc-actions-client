import { createPortal } from "react-dom";
import { useCallback, useState } from "react";
import Notification from "../components/notification";

export const useConfirmationPopup = (
  Component,
  width,
  height,
  componentProps = null
) => {
  const [isHidden, toggleHidden] = useState(true);

  const renderNotification = useCallback(() => {
    return !isHidden
      ? createPortal(
          <Notification
            background="var(--main-bg-color)"
            width={width}
            height={height}
          >
            <Component {...componentProps} onToggleHidden={toggleHidden} />
          </Notification>,
          document.body
        )
      : null;
  }, [isHidden, componentProps, width, height]);

  const showNotification = useCallback(() => {
    toggleHidden(false);
  }, []);

  return { renderNotification, showNotification };
};
