import { memo, useCallback, useState } from "react";
import { useMutation } from "react-query";
import PropTypes from "prop-types";

import { theme } from "theme";
import Button from "components/button";
import { Flex } from "components/flex";
import NotificationWithTexts from "components/notificationWithTexts";

import { useNotifications } from "hooks/useNotifications";
import sendOrder from "services/sendOrder";

const durationOfNotificationMs = 3000;

const SubmitOrderButton = ({
  basketAtoms,
  onBasketAtoms,
  translations,
  tableId,
  onLocation,
  restaurantId,
  totalCost,
}) => {
  const [isDisable, setIsDisable] = useState(!basketAtoms.order.length);
  const sendOrderMutation = useMutation(sendOrder);

  const { renderNotification, showNotification } = useNotifications(
    <NotificationWithTexts
      texts={[
        translations["order_is_confirmed"],
        translations["chefs_started_preparing_order"],
      ]}
    />,
    durationOfNotificationMs
  );

  const submitOrder = useCallback(() => {
    try {
      setIsDisable(true);
      sendOrderMutation
        .mutateAsync({ order: basketAtoms, restaurantId, tableId })
        .finally(() => {
          showNotification();
          onBasketAtoms((oldBasket) => ({
            ...oldBasket,
            personCount: 1,
            order: [],
          }));
          setTimeout(
            () => onLocation(`/restaurant/${restaurantId}/${tableId}`),
            durationOfNotificationMs
          );
        });
    } catch (err) {
      setIsDisable(false);
      console.log(err);
    }
  }, [
    restaurantId,
    tableId,
    onLocation,
    setIsDisable,
    basketAtoms,
    onBasketAtoms,
    showNotification,
    sendOrderMutation,
  ]);

  return (
    <Flex
      direction="column"
      height={1}
      justifyContent="flex-end"
      width={1}
      alignItems="center"
      flex={1}
      boxSizing="border-box"
      pt={theme.spacing(2)}
      p={theme.spacing(1)}
    >
      {renderNotification()}
      <Button onClick={submitOrder} width={1} disabled={isDisable}>
        {`${translations["confirm_order"]} (${totalCost + "$"})`}
      </Button>
    </Flex>
  );
};

SubmitOrderButton.propTypes = {
  basketAtoms: PropTypes.object,
  onBasketAtoms: PropTypes.func,
  translations: PropTypes.object,
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
  totalCost: PropTypes.string,
};

export default memo(SubmitOrderButton);
