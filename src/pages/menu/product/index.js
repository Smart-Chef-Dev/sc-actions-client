import { memo, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useRecoilState } from "recoil";

import { Flex } from "components/flex";

import { useTranslation } from "contexts/translation-context";
import { Routes } from "constants/routes";

import BasketState from "atoms/basket";
import MenuItem from "./components/menu-item";
import BackButton from "./components/back-button";
import { formatCurrency } from "utils/formatCurrency";

const Product = () => {
  const [, { restaurantId, itemId, tableId }] = useRoute(Routes.PRODUCT);
  const [, setLocation] = useLocation();

  const [menuItem, setMenuItem] = useState({});
  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const [isError, setIsError] = useState(false);

  const {
    strings: { product: translations },
  } = useTranslation();

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/menu/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsError(!response.ok);
        return;
      }

      return setMenuItem(await response.json());
    }

    getData();
  }, [restaurantId, itemId]);

  return (
    <Flex height={1} width={1} overflowY="auto" overflowX="hidden">
      {!isError && !!menuItem._id && (
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
  );
};

export default memo(Product);
