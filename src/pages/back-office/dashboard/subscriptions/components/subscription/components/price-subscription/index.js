import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "components/text";
import { theme } from "theme";
import { formatCurrency } from "utils/formatCurrency";

const PriceSubscription = ({ subscriptionPrice }) => {
  return (
    <Text pb={theme.spacing(1)}>
      {`
      ${formatCurrency(
        subscriptionPrice.currency.toUpperCase(),
        subscriptionPrice.unit_amount / 100
      )}
       per ${subscriptionPrice.recurring.interval}`}
    </Text>
  );
};

PriceSubscription.propTypes = {
  subscriptionId: PropTypes.string,
  subscriptionPrice: PropTypes.object,
};

export default memo(PriceSubscription);
