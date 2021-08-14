import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Button from "components/button";
import { deleteSubscriptions } from "services/stripeService";
import { theme } from "theme";

const CancellationOfSubscriptionPopup = ({
  translations,
  subscription,
  onButtonsLocked,
  onToggleHidden,
}) => {
  const deleteSubscriptionsMutation = useMutation(deleteSubscriptions);

  const unsubscribe = useCallback(() => {
    onButtonsLocked(true);
    deleteSubscriptionsMutation.mutateAsync().finally(() => {
      subscription.remove();
      subscription.refetch({ cancelRefetch: true });
      onButtonsLocked(false);
      onToggleHidden(true);
    });
  }, [
    deleteSubscriptionsMutation,
    subscription,
    onButtonsLocked,
    onToggleHidden,
  ]);

  const cancelUnsubscribe = useCallback(
    () => onToggleHidden(true),
    [onToggleHidden]
  );

  return (
    <Flex
      direction="column"
      p={theme.spacing(1)}
      boxSizing="border-box"
      alignItems="center"
    >
      <Text textAlign="center" mb={theme.spacing(1)}>
        {translations["cancellation_of_subscription"]}
      </Text>
      <Flex direction="column">
        <Button onClick={unsubscribe}>{translations["continue"]}</Button>
        <Button onClick={cancelUnsubscribe}>{translations["cancel"]}</Button>
      </Flex>
    </Flex>
  );
};

CancellationOfSubscriptionPopup.propTypes = {
  translations: PropTypes.object,
  subscription: PropTypes.object,
  onButtonsLocked: PropTypes.func,
  onToggleHidden: PropTypes.func,
};

export default memo(CancellationOfSubscriptionPopup);
