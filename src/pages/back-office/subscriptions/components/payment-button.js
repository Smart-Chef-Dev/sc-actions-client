import { memo, useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import PropTypes from "prop-types";

import Button from "components/button";
import { createCheckoutSession } from "services/stripeService";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import CancellationOfSubscriptionPopup from "./cancellation-of-subscription-popup";

const PaymentButton = ({
  price,
  subscription,
  translations,
  onButtonsLocked,
  isButtonsLocked,
}) => {
  const { data, isLoading, isError } = subscription;
  const createCheckoutSessionMutation = useMutation(createCheckoutSession);

  const { renderNotification, showNotification } = useConfirmationPopup(
    CancellationOfSubscriptionPopup,
    {
      width: "250px",
      height: "200px",
    },
    { subscription, translations, onButtonsLocked }
  );

  const subscriptionItems = useMemo(
    () =>
      !isLoading &&
      !isError &&
      data.items.data.find((currentItem) => currentItem.price.id === price.id),
    [price, data, isLoading, isError]
  );

  const createSession = useCallback(
    async () =>
      (document.location = await createCheckoutSessionMutation.mutateAsync({
        priceId: price.id,
      })),
    [price, createCheckoutSessionMutation]
  );

  return (
    <>
      {renderNotification()}
      {subscriptionItems ? (
        <Button onClick={showNotification} disabled={isButtonsLocked}>
          {translations["current_subscription"]}
        </Button>
      ) : (
        <Button onClick={createSession} disabled={isButtonsLocked}>
          {translations["arrange"]}
        </Button>
      )}
    </>
  );
};

PaymentButton.propTypes = {
  price: PropTypes.object,
  subscription: PropTypes.object,
  translations: PropTypes.object,
  onButtonsLocked: PropTypes.func,
  isButtonsLocked: PropTypes.bool,
};

export default memo(PaymentButton);
