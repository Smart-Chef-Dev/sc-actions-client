import { memo, useMemo } from "react";
import PropTypes from "prop-types";

import { Text } from "components/text";
import { theme } from "theme";
import { formatCurrency } from "utils/formatCurrency";

const Price = ({ price }) => {
  const subscriptionPriceAndDuration = useMemo(
    () => `
      ${formatCurrency(price.currency.toUpperCase(), price.unit_amount / 100)}
       per ${price.recurring.interval}`,
    [price]
  );

  return (
    <Text pb={theme.spacing(1)} color="var(--text-grey)">
      {subscriptionPriceAndDuration}
    </Text>
  );
};

Price.propTypes = {
  price: PropTypes.object,
};

export default memo(Price);
