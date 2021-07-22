import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "components/text";
import { theme } from "theme";
import { formatCurrency } from "utils/formatCurrency";

const Price = ({ price }) => {
  return (
    <Text pb={theme.spacing(1)} color="var(--text-grey)">
      {`
      ${formatCurrency(price.currency.toUpperCase(), price.unit_amount / 100)}
       per ${price.recurring.interval}`}
    </Text>
  );
};

Price.propTypes = {
  price: PropTypes.object,
};

export default memo(Price);
