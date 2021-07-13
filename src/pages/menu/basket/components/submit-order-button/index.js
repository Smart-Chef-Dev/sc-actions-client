import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";

import { theme } from "theme";
import Button from "components/button";
import { Flex } from "components/flex";

const SubmitOrderButton = ({
  basketAtoms,
  onBasketAtoms,
  translations,
  tableId,
  onLocation,
  restaurantId,
  totalCost,
}) => {
  const [isDisable, setIsDisable] = useState(!basketAtoms.order.length);

  const submitOrder = useCallback(() => {
    try {
      setIsDisable(true);
      fetch(`/api/message/${restaurantId}/${tableId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basketAtoms),
      }).finally(() => {
        onBasketAtoms({ personCount: 1, order: [] });
        onLocation(`/restaurant/${restaurantId}/${tableId}`);
      });
    } catch (err) {
      setIsDisable(false);
      console.log(err);
    }
  }, [
    restaurantId,
    tableId,
    onLocation,
    setIsDisable,
    basketAtoms,
    onBasketAtoms,
  ]);

  return (
    <Flex
      direction="column"
      height={1}
      justifyContent="flex-end"
      width={1}
      alignItems="center"
      flex={1}
      boxSizing="border-box"
      pt={theme.spacing(2)}
      p={theme.spacing(1)}
    >
      <Button onClick={submitOrder} width={1} disabled={isDisable}>
        {`${translations["confirm_order"]} (${totalCost + "$"})`}
      </Button>
    </Flex>
  );
};

SubmitOrderButton.propTypes = {
  basketAtoms: PropTypes.object,
  onBasketAtoms: PropTypes.func,
  translations: PropTypes.object,
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.string,
  totalCost: PropTypes.string,
};

export default memo(SubmitOrderButton);
