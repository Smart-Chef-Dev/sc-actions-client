import { memo, useEffect, useState, useCallback } from "react";
import { useRoute } from "wouter";

import { Routes } from "../../constants/routes";
import Button from "../../components/button";

const Actions = () => {
  const [, { restaurantId, tableId }] = useRoute(Routes.ACTIONS);
  const [isLoading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const resp = await fetch(`/api/restaurant/${restaurantId}/action`);
      const data = await resp.json();
      setActions(data);
      setLoading(false);
    })();
  }, [restaurantId, tableId]);

  const handleClick = useCallback(
    (id) => async () => {
      await fetch(`/api/message/${restaurantId}/${tableId}/${id}`, {
        method: "POST",
      });
    },
    [restaurantId, tableId]
  );

  return !isLoading ? (
    <>
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
