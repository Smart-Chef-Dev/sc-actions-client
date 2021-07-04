import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Text } from "components/text";
import { Flex } from "components/flex";
import { theme } from "theme";

import Arrow from "assets/icons/expanded-menu/arrow.svg";

const ReturnMainMenuButton = ({
  restaurantId,
  tableId,
  translations,
  onLocation,
}) => {
  const handleArrowClick = useCallback(() => {
    onLocation(`/restaurant/${restaurantId}/${tableId}`);
  }, [onLocation, restaurantId, tableId]);

  return (
    <s.Arrow alignItems="center" onClick={handleArrowClick}>
      <Arrow />
      <Text color="var(--text-grey)" fontSize={theme.fontSize(2)}>
        {translations["menu"]}
      </Text>
    </s.Arrow>
  );
};

const s = {
  Arrow: styled(Flex)`
    position: absolute;
    left: 8px;
    top: 12px;
  `,
};

ReturnMainMenuButton.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  translations: PropTypes.object,
  onLocation: PropTypes.func,
};

export default memo(ReturnMainMenuButton);
