import { memo, useCallback } from "react";
import { useQuery } from "react-query";
import { useLocation, useRoute } from "wouter";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import ImageContainer from "components/image";
import { Img } from "components/img";

import { theme } from "theme";
import { Routes } from "constants/routes";

import getMenuItemsByCategoryId from "services/getMenuItemsByCategoryId";

const MenuItem = ({ categoryId }) => {
  const [, { restaurantId, tableId }] = useRoute(Routes.MENU);
  const [, setLocation] = useLocation();

  const menuItems = useQuery(
    ["menuItems", { categoryId }],
    getMenuItemsByCategoryId
  );

  const handleItemClick = useCallback(
    (itemId) => () => {
      setLocation(`/restaurant/${restaurantId}/${tableId}/item/${itemId}`);
    },
    [setLocation, restaurantId, tableId]
  );

  return (
    !menuItems.isLoading && (
      <Flex overflowX="auto">
        {menuItems.data.map((currentMenuItems) => (
          <Flex
            key={currentMenuItems._id}
            pr={theme.spacing(1)}
            pb={theme.spacing(1)}
          >
            <Flex direction="column">
              <ImageContainer
                src={currentMenuItems.pictureUrl}
                preSrc={currentMenuItems.pictureLqipPreview}
              >
                {(src) => (
                  <s.Preview
                    src={src}
                    alt={currentMenuItems.name}
                    loading="lazy"
                    borderRadius="10%"
                    mb={theme.spacing(1)}
                    onClick={handleItemClick(currentMenuItems._id)}
                  />
                )}
              </ImageContainer>

              <s.ProductName>{currentMenuItems.name}</s.ProductName>
              <Text color="var(--text-grey)">{currentMenuItems.price}$</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    )
  );
};

MenuItem.propTypes = {
  categoryId: PropTypes.string,
};

const s = {
  Preview: styled(Img)`
    max-width: 135px;
    min-height: 105px;

    object-fit: cover;
  `,
  ProductName: styled(Text)`
    max-width: 130px;
  `,
};

export default memo(MenuItem);
