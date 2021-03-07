import { memo, useEffect, useState, useCallback } from "react";
import { useRoute } from "wouter";

import { Routes } from "../../constants/routes";
import Button from "../../components/button";
import { useErrorContext } from "../error-boundary";
import { useNotifications } from "../../hooks/useNotifications";
import { ReactComponent as DoneIcon } from "./done-icon.svg";

const Actions = () => {
  const [, { restaurantId, tableId }] = useRoute(Routes.ACTIONS);
  const [isLoading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);
  const { handleError } = useErrorContext();
  const { renderNotification, showNotification } = useNotifications(
    <DoneIcon />
  );

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
      await fetch(`/api/message/${restaurantId}/${tableId}/${id}`, {
        method: "POST",
      });
    },
    [restaurantId, showNotification, tableId]
  );

  return !isLoading ? (
    <>
      {renderNotification()}
      {actions.map((a) => (
        <Button
          key={a._id}
          classNames="margin-bottom-one"
          text={a.name}
          onClick={handleClick(a._id)}
        />
      ))}
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default memo(Actions);
