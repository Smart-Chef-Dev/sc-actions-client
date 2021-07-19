import { memo } from "react";
import PropTypes from "prop-types";

import Addons from "components/addons";
import { Flex } from "components/flex";
import { theme } from "theme";

const AddonsBasket = ({ unfoldedItemId, currentValue }) => {
  return (
    <>
      {unfoldedItemId === currentValue._id && (
        <Flex
          px={theme.spacing(1)}
          width={1}
          boxSizing="border-box"
          my={theme.spacing(1)}
        >
          <Addons order={currentValue} />
        </Flex>
      )}
    </>
  );
};

AddonsBasket.propTypes = {
  unfoldedItemId: PropTypes.string,
  currentValue: PropTypes.object,
};

export default memo(AddonsBasket);
