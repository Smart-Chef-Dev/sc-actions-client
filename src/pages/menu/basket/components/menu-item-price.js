import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { formatCurrency } from "utils/formatCurrency";
import { theme } from "theme";

const MenuItemPrice = ({ menuItem }) => {
  const calculateSumOfAddons = useCallback(
    (addons) =>
      addons.reduce(
        (previousValues, currentValue) =>
          currentValue.isIncludedInOrder
            ? previousValues + +currentValue.price
            : previousValues,
        0
      ),
    []
  );

  return (
    <>
      {menuItem.addons.length &&
      menuItem.addons.find((m) => m.isIncludedInOrder) ? (
        <Flex direction="column" ml={theme.spacing(2)} alignItems="center">
          <Text>
            {formatCurrency(
              menuItem.category.restaurant.currencyCode,
              calculateSumOfAddons(menuItem.addons)
            )}
          </Text>
          <Text>+</Text>
          <Text>
            {formatCurrency(
              menuItem.category.restaurant.currencyCode,
              menuItem.price
            )}
          </Text>
        </Flex>
      ) : (
        <Text pl={theme.spacing(2)}>
          {formatCurrency(
            menuItem.category.restaurant.currencyCode,
            menuItem.price
          )}
        </Text>
      )}
    </>
  );
};

MenuItemPrice.propTypes = {
  menuItem: PropTypes.object,
};

export default memo(MenuItemPrice);
