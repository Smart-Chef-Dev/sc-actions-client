import { memo, useCallback, useMemo } from "react";
import { useRoute } from "wouter";

import { Routes } from "constants/routes";
import Loader from "components/loader";
import { useNotifications } from "hooks/useNotifications";
import { useScreenBlock } from "hooks/useScreenBlock";
import { useRestaurant } from "hooks/useRestaurant";
import ActionComponent from "./action-component";
import DoneIcon from "./done-icon.svg";
import { useUpdateLanguage } from "contexts/translation-context";

const Actions = () => {
  const [, { restaurantId, tableId }] = useRoute(Routes.ACTIONS);
  const { isLoading, restaurant } = useRestaurant(restaurantId);
  const actions = useMemo(() => {
    return restaurant?.actions ?? [];
  }, [restaurant?.actions]);
  useUpdateLanguage(restaurant?.language);

  const { renderNotification, showNotification } = useNotifications(
    <DoneIcon />
  );

  const { renderScreenBlock, attemptsWrapper } = useScreenBlock(
    restaurant?.language
  );

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
