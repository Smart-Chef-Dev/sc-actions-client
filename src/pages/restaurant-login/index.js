import { memo, useCallback, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { styled } from "@linaria/react";

import { useTranslation } from "contexts/translation-context";
import { useRestaurant } from "hooks/useRestaurant";
import Input from "components/input";
import { Label } from "components/label";
import { Routes } from "constants/routes";
import Button from "components/button";
import { Flex } from "components/flex";
import { theme } from "theme";

const RestaurantLogin = () => {
  const [, setLocation] = useLocation();
  const {
    strings: { restaurantLogin: translations },
  } = useTranslation();
  const [, { restaurantId }] = useRoute(Routes.RESTAURANT_LOGIN);
  const { restaurant } = useRestaurant(restaurantId);
  const [tableNumber, setTableNumber] = useState("");
  const [error, setError] = useState("");

  const handleClick = useCallback(() => {
    const { tables } = restaurant;

    const table = tables.find((t) => t.number === +tableNumber);
    if (table) {
      setLocation(`/${restaurantId}/${table._id}`);
    } else {
      setError(translations["table_not_found_error"]);
    }
  }, [restaurant, restaurantId, setLocation, tableNumber, translations]);

  return (
    <Flex width={1 / 2} direction="column">
      <s.ErrorMessage width={1} justifyContent="center" mb={theme.spacing(2)}>
        {error}
      </s.ErrorMessage>
      <Label>{translations["enter_table_name"]}</Label>
      <Input value={tableNumber} onChange={setTableNumber} />
      <Flex width={1} my={theme.spacing(2)} justifyContent="center">
        <Button onClick={handleClick}>{translations["enter_button"]}</Button>
      </Flex>
    </Flex>
  );
};

const s = {
  ErrorMessage: styled(Flex)`
    color: var(--main-color);
  `,
};

export default memo(RestaurantLogin);
