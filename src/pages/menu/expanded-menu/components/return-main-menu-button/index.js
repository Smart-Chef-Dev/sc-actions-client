import { memo, useCallback } from "react";
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
    <Flex
      onClick={handleArrowClick}
      ml={theme.spacing(1)}
      mt={theme.spacing(1)}
    >
      <Arrow />
      <Text color="var(--text-grey)" fontSize={theme.fontSize(2)}>
        {translations["menu"]}
      </Text>
    </Flex>
  );
};

ReturnMainMenuButton.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  translations: PropTypes.object,
  onLocation: PropTypes.func,
};

export default memo(ReturnMainMenuButton);
