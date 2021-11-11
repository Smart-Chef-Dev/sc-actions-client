import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import Arrow from "assets/icons/product/arrow.svg";
import { Flex } from "components/flex";

const BackButton = ({ onLocation, restaurantId, tableId }) => {
  const handleArrowClick = useCallback(
    () => onLocation(`/restaurant/${restaurantId}/${tableId}`),
    [onLocation, restaurantId, tableId]
  );

  return (
    <s.Arrow>
      <Arrow onClick={handleArrowClick} />
    </s.Arrow>
  );
};

const s = {
  Arrow: styled(Flex)`
    position: absolute;
    left: 20px;
    top: 20px;
  `,
};

BackButton.propTypes = {
  onLocation: PropTypes.func,
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
};

export default memo(BackButton);
