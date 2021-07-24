import { memo, useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import PropTypes from "prop-types";

import Button from "components/button";
import {
  createCheckoutSession,
  deleteSubscriptions,
} from "services/stripeService";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";

const PaymentButton = ({
  price,
  subscription,
  translations,
  onButtonsLocked,
  isButtonsLocked,
}) => {
  const { data, isLoading, isError } = subscription;
  const createCheckoutSessionMutation = useMutation(createCheckoutSession);
  const deleteSubscriptionsMutation = useMutation(deleteSubscriptions);

  const cancelSubscription = useCallback(() => {
    onButtonsLocked(true);
    deleteSubscriptionsMutation.mutateAsync().finally(() => {
      subscription.remove();
      subscription.refetch({ cancelRefetch: true });
      onButtonsLocked(false);
    });
  }, [deleteSubscriptionsMutation, subscription, onButtonsLocked]);

  const { renderNotification, showNotification } = useConfirmationPopup(
    translations["cancellation_of_subscription"],
    cancelSubscription
  );

  const subscriptionItems = useMemo(
    () =>
      !isLoading &&
      !isError &&
      data.items.data.find((currentItem) => currentItem.price.id === price.id),
    [price, data, isLoading, isError]
  );

  const createSession = useCallback(async () => {
    document.location = await createCheckoutSessionMutation.mutateAsync({
      priceId: price.id,
    });
  }, [price, createCheckoutSessionMutation]);

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
