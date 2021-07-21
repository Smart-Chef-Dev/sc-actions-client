import { memo, useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import PropTypes from "prop-types";

import Button from "components/button";
import { createCheckoutSession } from "services/stripeService";

const PaymentButton = ({
  price,
  userDataAtoms,
  subscription,
  translations,
}) => {
  const { data, isLoading, isError } = subscription;
  const mutation = useMutation(createCheckoutSession);

  const subscriptionItems = useMemo(
    () =>
      !isLoading &&
      !isError &&
      data.items.data.find((currentItem) => currentItem.price.id === price.id),
    [price, data, isLoading, isError]
  );

  const createSession = useCallback(async () => {
    document.location = await mutation.mutateAsync({
      priceId: price.id,
      jwt: userDataAtoms.jwt,
    });
  }, [price, userDataAtoms, mutation]);

  return (
    <>
      {subscriptionItems ? (
        <Button disabled={true}>{translations["current_subscription"]}</Button>
      ) : (
        <Button onClick={createSession}>{translations["arrange"]}</Button>
      )}
    </>
  );
};

PaymentButton.propTypes = {
  price: PropTypes.object,
  userDataAtoms: PropTypes.object,
  subscription: PropTypes.object,
  translations: PropTypes.object,
};

export default memo(PaymentButton);
