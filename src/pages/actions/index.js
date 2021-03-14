import { memo, useCallback, useEffect, useState } from "react";
import { useRoute } from "wouter";

import { Routes } from "constants/routes";
import Button from "components/button";
import Loader from "components/loader";
import { useErrorContext } from "pages/error-boundary";
import { useNotifications } from "hooks/useNotifications";
import { useScreenBlock } from "hooks/useScreenBlock";
import DoneIcon from "./done-icon.svg";

const Actions = () => {
  const [, { restaurantId, tableId }] = useRoute(Routes.ACTIONS);
  const [isLoading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);
  const { handleError } = useErrorContext();
  const { renderNotification, showNotification } = useNotifications(
    <DoneIcon />
  );
  const { renderScreenBlock, attemptsWrapper } = useScreenBlock();

  useEffect(() => {
    if (!restaurantId) {
      return handleError(new Error("restaurantId or tableId not provided"));
    }

    setLoading(true);
    (async () => {
      const resp = await fetch(`/api/restaurant/${restaurantId}/action`);
      if (!resp.ok) {
        return handleError(new Error("Can't fetch actions"));
      }
      const data = await resp.json();
      setActions(data);
      setLoading(false);
    })();
  }, [handleError, restaurantId]);

  const handleClick = useCallback(
    (id) => async () => {
      showNotification();
      attemptsWrapper();
      await fetch(`/api/message/${restaurantId}/${tableId}/${id}`, {
        method: "POST",
      });
    },
    [attemptsWrapper, restaurantId, showNotification, tableId]
  );

  return !isLoading ? (
    <>
      {renderNotification()}
      {renderScreenBlock()}
      {actions.map((a) => (
        <Button
          key={a._id}
          classNames="margin-bottom-one"
          onClick={handleClick(a._id)}
        >
          {a.name}
        </Button>
      ))}
    </>
  ) : (
    <Loader />
  );
};

export default memo(Actions);
