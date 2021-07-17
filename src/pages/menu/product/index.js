import { memo, useCallback, useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import Button from "components/button";
import Counter from "components/counter";
import Loader from "components/loaders";

import { useTranslation } from "contexts/translation-context";
import { Routes } from "constants/routes";

import BasketState from "atoms/basket";
import MenuItem from "./components/menu-item";
import BackButton from "./components/back-button";

import getMenuItemsById from "services/getMenuItemsById";

const Product = () => {
  const [, { restaurantId, itemId, tableId }] = useRoute(Routes.PRODUCT);
  const [, setLocation] = useLocation();

  const [count, setCount] = useState(1);

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
            menuItem={menuItem}
          />
        </Flex>
      )}
    </Flex>
  ) : (
    <Loader />
  );
};

export default memo(Product);
