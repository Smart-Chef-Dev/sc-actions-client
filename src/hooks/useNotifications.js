import { useCallback, useEffect, useState } from "react";

import Notification from "components/notification";

const DEFAULT_HIDE_TIMEOUT = 1000;

export const useNotifications = (text, hideTimeout = DEFAULT_HIDE_TIMEOUT) => {
  const [isHidden, toggleHidden] = useState(true);

  useEffect(() => {
    if (!isHidden) {
      setTimeout(() => toggleHidden(true), hideTimeout);
    }
  }, [hideTimeout, isHidden]);

  const renderNotification = useCallback(() => {
    return isHidden ? <></> : <Notification text={text} />;
  }, [isHidden, text]);

  const showNotification = useCallback(() => {
    toggleHidden(false);
  }, []);

  return { renderNotification, showNotification };
};
