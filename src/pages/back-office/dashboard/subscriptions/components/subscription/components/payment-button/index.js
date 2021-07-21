import { memo, useCallback, useMemo } from "react";
import Button from "components/button";
import PropTypes from "prop-types";

const PaymentButton = ({ price, userDataAtoms, subscription }) => {
  const { data, isLoading, isError } = subscription;

  const subscriptionItems = useMemo(
    () =>
      !isLoading &&
      !isError &&
      data.items.data.find((currentItem) => currentItem.price.id === price.id),
    [price, data, isLoading, isError]
  );

  const createSession = useCallback(async () => {
    const response = await fetch(
      `/api/subscriptions/prices/${price.id}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userDataAtoms.jwt,
        },
      }
    );

    document.location = await response.text();
  }, [price, userDataAtoms]);

  return (
    <>
      {subscriptionItems ? (
        <Button onClick={createSession} disabled={true}>
          Current subscription
        </Button>
      ) : (
        <Button onClick={createSession}>Pay</Button>
      )}
    </>
  );
};

PaymentButton.propTypes = {
  price: PropTypes.object,
  userDataAtoms: PropTypes.object,
  subscription: PropTypes.object,
};

export default memo(PaymentButton);
