import { memo } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { Flex } from "components/flex";
import Loader from "components/loaders";
import MenuItem from "./components/menu-item";
import BackButton from "./components/back-button";

import { useTranslation } from "contexts/translation-context";
import { Routes } from "constants/routes";
import BasketState from "atoms/basket";
import { getMenuItemsById } from "services/menuItemsService";

const Product = () => {
  const [, { restaurantId, itemId, tableId }] = useRoute(Routes.PRODUCT);
  const [, setLocation] = useLocation();

  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const {
    strings: { product: translations },
  } = useTranslation();

  const { data, isError, isLoading } = useQuery(
    ["menuItem", { itemId }],
    getMenuItemsById
  );

  return !isLoading ? (
    <Flex height={1} width={1} overflowY="auto" overflowX="hidden">
      {!isError && (
        <Flex direction="column" height={1} width={1}>
          <BackButton
            onLocation={setLocation}
            tableId={tableId}
            restaurantId={restaurantId}
          />
          <MenuItem
            translations={translations}
            itemId={itemId}
            basketAtoms={basketAtoms}
            onBasketAtoms={setBasketAtoms}
            menuItem={data}
          />
        </Flex>
      )}
    </Flex>
  ) : (
    <Loader />
  );
};

export default memo(Product);
