import { memo, useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import { useRoute } from "wouter";

import { Routes } from "constants/routes";
import Loader from "components/loader";
import { useNotifications } from "hooks/useNotifications";
import { useScreenBlock } from "hooks/useScreenBlock";
import { useRestaurant } from "hooks/useRestaurant";
import ActionComponent from "./action-component";
import DoneIcon from "assets/icons/actions/done-icon.svg";

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

  const sendAction = useMutation((id) =>
    fetch(`/api/message/${restaurantId}/${tableId}/${id}`, {
      method: "POST",
    })
  );

  const handleClick = useCallback(
    (id) => async () => {
      showNotification();
      attemptsWrapper();
      sendAction.mutate(id);
    },
    [showNotification, sendAction, attemptsWrapper]
  );

  return !isLoading ? (
    <>
      {renderNotification()}
      {renderScreenBlock()}
      {actions.map((a) => (
        <ActionComponent
          key={a._id}
          _id={a._id}
          name={a.name}
          link={a.link}
          onClick={handleClick}
        />
      ))}
    </>
  ) : (
    <Loader />
  );
};

export default memo(Actions);
