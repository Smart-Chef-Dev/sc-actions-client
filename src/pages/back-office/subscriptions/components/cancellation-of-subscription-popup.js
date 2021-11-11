import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

import { deleteSubscriptions } from "services/stripeService";
import ConfirmationPopup from "components/confirmationPopup/confirmationPopup";
import { Flex } from "components/flex";
import { theme } from "theme";

const CancellationOfSubscriptionPopup = ({
  translations,
  subscription,
  onButtonsLocked,
  onToggleHidden,
}) => {
  const deleteSubscriptionsMutation = useMutation(deleteSubscriptions);

  const texts = useMemo(
    () => [
      {
        text: translations["cancellation_of_subscription"],
        property: {
          mb: theme.spacing(1),
        },
      },
    ],
    [translations]
  );

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

  return (
    <Flex p={theme.spacing(1)} boxSizing="border-box">
      <ConfirmationPopup
        texts={texts}
        onToggleHidden={onToggleHidden}
        actionButton={unsubscribe}
        nameContinueButton={translations["continue"]}
        nameCancelButton={translations["cancel"]}
        directionOfButtons="column"
      />
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
