import { memo, useCallback, useMemo } from "react";
import { useRoute } from "wouter";

import { Routes } from "constants/routes";
import Button from "components/button";
import Loader from "components/loader";
import { useNotifications } from "hooks/useNotifications";
import { useScreenBlock } from "hooks/useScreenBlock";
import { useRestaurant } from "hooks/useRestaurant";
import DoneIcon from "./done-icon.svg";

const Actions = () => {
  const [, { restaurantId, tableId }] = useRoute(Routes.ACTIONS);
  const { isLoading, restaurant } = useRestaurant(restaurantId);
  const actions = useMemo(() => {
    return restaurant?.actions ?? [];
  }, [restaurant?.actions]);

  const { renderNotification, showNotification } = useNotifications(
    <DoneIcon />
  );
  const { renderScreenBlock, attemptsWrapper } = useScreenBlock();

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
