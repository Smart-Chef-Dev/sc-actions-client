import { memo, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import MenuItem from "pages/menu/main-menu/components/menuItem";
import { theme } from "theme";

import Arrow from "assets/icons/main-menu/arrow.svg";
import { styled } from "@linaria/react";

const Category = ({ restaurantId, tableId, onLocation, category }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const handleArrowClick = useCallback(
    (categoryId) => () => {
      onLocation(`/restaurant/${restaurantId}/${tableId}/${categoryId}`);
    },
    [onLocation, restaurantId, tableId]
  );

  return (
    <Flex direction="column" width={1} ref={ref}>
      <Flex width={1} onClick={handleArrowClick(category._id)}>
        <Text fontSize={theme.fontSize(2)} fontWeight="bold">
          {category.name}
        </Text>
        <Flex
          width={1}
          height={1}
          flex="1"
          mr={theme.spacing(1)}
          direction="row-reverse"
          alignItems="center"
        >
          <Arrow />
        </Flex>
      </Flex>
      <Flex
        boxSizing="border-box"
        pl={theme.spacing(1)}
        pt={theme.spacing(1)}
        width={1}
        height={1}
      >
        {inView ? (
          <MenuItem
            categoryId={category._id}
            restaurantId={restaurantId}
            tableId={tableId}
            onLocation={onLocation}
          />
        ) : (
          <Placeholder />
        )}
      </Flex>
    </Flex>
  );
};

Category.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
  category: PropTypes.object,
};

const Placeholder = styled(Flex)`
  min-height: 135px;
`;

export default memo(Category);
