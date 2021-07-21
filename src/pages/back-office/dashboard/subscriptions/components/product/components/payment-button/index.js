import { memo, useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import PropTypes from "prop-types";

import Button from "components/button";
import {
  createCheckoutSession,
  deleteSubscriptions,
} from "services/stripeService";
import { useWarning } from "hooks/useWarning";

const PaymentButton = ({
  price,
  userDataAtoms,
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
    deleteSubscriptionsMutation
      .mutateAsync({ jwt: userDataAtoms.jwt })
      .finally(() => {
        subscription.remove();
        subscription.refetch({ cancelRefetch: true });
        onButtonsLocked(false);
      });
  }, [
    deleteSubscriptionsMutation,
    userDataAtoms,
    subscription,
    onButtonsLocked,
  ]);

  const { renderNotification, showNotification } = useWarning(
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
      jwt: userDataAtoms.jwt,
    });
  }, [price, userDataAtoms, createCheckoutSessionMutation]);

  const showWarning = useCallback(() => {
    showNotification();
  }, [showNotification]);

  return (
    <>
      {renderNotification()}
      {subscriptionItems ? (
        <Button onClick={showWarning} disabled={isButtonsLocked}>
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
  userDataAtoms: PropTypes.object,
  subscription: PropTypes.object,
  translations: PropTypes.object,
  onButtonsLocked: PropTypes.func,
  isButtonsLocked: PropTypes.func,
};

export default memo(PaymentButton);
