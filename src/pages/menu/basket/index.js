import { memo, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useRoute } from "wouter";
import { useMutation } from "react-query";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import BasketState from "atoms/basket";
import { useTranslation } from "contexts/translation-context";

import { theme } from "theme";
import { Routes } from "constants/routes";

import MenuItems from "./components/menu-items";
import PeopleCounter from "./components/people-counter";
import SubmitOrderButton from "./components/submit-order-button";

import sendOrder from "services/sendOrder";

const Basket = () => {
  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const [, setLocation] = useLocation();
  const [, { restaurantId, tableId }] = useRoute(Routes.BASKET);

  const sendOrderMutation = useMutation(sendOrder);

  const {
    strings: { basket: translations },
  } = useTranslation();

  const totalCost = useMemo(() => {
    return basketAtoms.order
      .reduce(
        (previousValues, currentValue) =>
          previousValues + currentValue.price * currentValue.count,
        0
      )
      .toFixed(1);
  }, [basketAtoms]);

  const countMenuItems = useMemo(() => {
    return basketAtoms.order.reduce(
      (previousValues, currentValue) => previousValues + +currentValue.count,
      0
    );
  }, [basketAtoms]);

  const changeOrderItemCount = useCallback(
    (diff, productId) => () => {
      const product = basketAtoms.order.find(
        (currentValue) => currentValue._id === productId
      );

      if (product.count + diff <= 0) {
        return setBasketAtoms((oldOrder) => ({
          ...oldOrder,
          order: oldOrder.order.filter(
            (currentValue) => currentValue._id !== productId
          ),
        }));
      }

      setBasketAtoms((oldOrder) => {
        return {
          ...oldOrder,
          order: oldOrder.order.map((currentValue) =>
            currentValue._id === productId
              ? {
                  ...currentValue,
                  count: currentValue.count + diff,
                }
              : currentValue
          ),
        };
      });
    },
    [basketAtoms, setBasketAtoms]
  );

  const changeNumberOfPeople = useCallback(
    (diff) => () => {
      if (basketAtoms.personCount + diff >= 1)
        setBasketAtoms({
          ...basketAtoms,
          personCount: basketAtoms.personCount + diff,
        });
    },
    [basketAtoms, setBasketAtoms]
  );

  const removeOrder = useCallback(() => {
    setBasketAtoms((oldOrder) => {
      return {
        ...oldOrder,
        order: oldOrder.order.filter(
          (currentValue) => currentValue._id !== preRemoveItemId
        ),
      };
    });
  }, [setBasketAtoms, preRemoveItemId]);

  const submitOrder = useCallback(() => {
    try {
      setIsDisable(true);
      sendOrderMutation
        .mutateAsync({ order: basketAtoms, restaurantId, tableId })
        .finally(() => {
          setBasketAtoms({ personCount: 1, order: [] });
          setLocation(`/restaurant/${restaurantId}/${tableId}`);
        });
    } catch (err) {
      setIsDisable(false);
      console.log(err);
    }
  }, [
    sendOrderMutation,
    restaurantId,
    tableId,
    setLocation,
    setIsDisable,
    basketAtoms,
    setBasketAtoms,
  ]);

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
