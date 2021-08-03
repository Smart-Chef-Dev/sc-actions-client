import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Notification from "components/notification";

const DEFAULT_HIDE_TIMEOUT = 1000;

export const useNotifications = (
  notification,
  hideTimeout = DEFAULT_HIDE_TIMEOUT
) => {
  const [isHidden, toggleHidden] = useState(true);

  useEffect(() => {
    createPortal;
    if (!isHidden) {
      setTimeout(() => toggleHidden(true), hideTimeout);
    }
  }, [hideTimeout, isHidden]);

  const renderNotification = useCallback(() => {
    return !isHidden
      ? createPortal(<Notification>{notification}</Notification>, document.body)
      : null;
  }, [isHidden, notification]);

  const showNotification = useCallback(() => {
    toggleHidden(false);
  }, []);

  return { renderNotification, showNotification };
};
