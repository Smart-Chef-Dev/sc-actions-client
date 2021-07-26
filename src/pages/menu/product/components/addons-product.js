import { memo } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { theme } from "theme";
import Addons from "components/addons";

const AddonsProduct = ({ menuItem, itemId, basketAtoms, inTheBasket }) => {
  return (
    <>
      {inTheBasket &&
        !!menuItem.addons.length &&
        basketAtoms.order.map(
          (currentOrder) =>
            currentOrder._id === itemId && (
              <Flex my={theme.spacing(1)} width={1} key={currentOrder._id}>
                <Addons key={currentOrder} order={currentOrder} />
              </Flex>
            )
        )}
    </>
  );
};

AddonsProduct.propTypes = {
  menuItem: PropTypes.object,
  basketAtoms: PropTypes.object,
  inTheBasket: PropTypes.bool,
  itemId: PropTypes.string,
};

export default memo(AddonsProduct);
