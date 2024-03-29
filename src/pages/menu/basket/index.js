import { memo, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useRoute } from "wouter";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import MenuItems from "./components/menu-items";
import PeopleCounter from "./components/people-counter";
import SubmitOrderButton from "./components/submit-order-button";

import BasketState from "atoms/basket";
import { useTranslation } from "contexts/translation-context";

import { theme } from "theme";
import { Routes } from "constants/routes";

const Basket = () => {
  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const [, setLocation] = useLocation();
  const [, { restaurantId, tableId }] = useRoute(Routes.BASKET);

  const {
    strings: { basket: translations },
  } = useTranslation();

  const totalCost = useMemo(() => {
    return basketAtoms.order
      .reduce((previousOrder, currentOrder) => {
        const addons = currentOrder.addons.reduce(
          (previousAddons, currentModifier) =>
            currentModifier.isIncludedInOrder
              ? previousAddons + +currentModifier.price
              : previousAddons,
          0
        );

        return (
          previousOrder + addons + +currentOrder.price * currentOrder.count
        );
      }, 0)
      .toFixed(1);
  }, [basketAtoms]);

  const countMenuItems = useMemo(() => {
    return basketAtoms.order.reduce(
      (previousValues, currentValue) => previousValues + +currentValue.count,
      0
    );
  }, [basketAtoms]);

  return (
    <Flex direction="column" height={1} width={1} boxSizing="border-box">
      <Flex height={1} weight={1} flex={1}>
        <Text
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
          pt={theme.spacing(2)}
          pb={theme.spacing(1)}
          pl={theme.spacing(1)}
        >
          {translations["my_order"]} ({countMenuItems})
        </Text>
      </Flex>
      <Divider mb={theme.spacing(1)} ml={theme.spacing(1)} />
      <Flex
        height={1}
        width={1}
        direction="column"
        boxSizing="border-box"
        overflowY="auto"
        overflowX="hidden"
      >
        <PeopleCounter
          onBasketAtoms={setBasketAtoms}
          basketAtoms={basketAtoms}
          translations={translations}
        />
        <MenuItems
          onBasketAtoms={setBasketAtoms}
          basketAtoms={basketAtoms}
          translations={translations}
          totalCost={totalCost}
        />
      </Flex>
      <SubmitOrderButton
        onBasketAtoms={setBasketAtoms}
        basketAtoms={basketAtoms}
        translations={translations}
        onLocation={setLocation}
        tableId={tableId}
        restaurantId={restaurantId}
        totalCost={totalCost}
      />
    </Flex>
  );
};

export default memo(Basket);
