import { memo, useCallback, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { styled } from "@linaria/react";

import {
  useTranslation,
  useUpdateLanguage,
} from "contexts/translation-context";
import { useRestaurant } from "hooks/useRestaurant";
import TableNumberInput from "components/table-number-input";
import { Label } from "components/label";
import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { theme } from "theme";

const RestaurantLogin = () => {
  const [, setLocation] = useLocation();
  const {
    strings: { restaurantLogin: translations },
  } = useTranslation();
  const [, { restaurantId }] = useRoute(Routes.RESTAURANT_LOGIN);
  const { restaurant } = useRestaurant(restaurantId);
  const [error, setError] = useState("");

  useUpdateLanguage(restaurant?.language);

  const handleSubmit = useCallback(
    (tableNumber) => {
      const { tables } = restaurant;

      const table = tables.find((t) => t.number === +tableNumber);
      if (table) {
        setLocation(`/${restaurantId}/${table._id}`);
      } else {
        setError(translations["table_not_found_error"]);
      }
    },
    [restaurant, restaurantId, setLocation, translations]
  );

  return (
    <Flex
      width={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <s.ErrorMessage width={1} justifyContent="center" mb={theme.spacing(2)}>
        {error}
      </s.ErrorMessage>
      <Flex mb={theme.spacing(1)}>
        <Label>{translations["enter_table_name"]}</Label>
      </Flex>
      <TableNumberInput
        isLoading={false}
        isInvalid={false}
        resetPasswordKey="1234"
        onSubmit={handleSubmit}
      />
    </Flex>
  );
};

const s = {
  ErrorMessage: styled(Flex)`
    color: var(--main-color);
  `,
};

export default memo(RestaurantLogin);
