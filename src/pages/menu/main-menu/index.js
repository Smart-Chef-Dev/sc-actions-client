import { memo, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useRecoilState } from "recoil";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

import BasketState from "atoms/basket";

import Category from "./components/category";
import { useQuery } from "react-query";
import getAllCategories from "../../../services/getAllCategories";

const Menu = () => {
  const [, { restaurantId, tableId }] = useRoute(Routes.MENU);
  const [, setLocation] = useLocation();

  const {
    strings: { mainMenu: translations },
  } = useTranslation();

  const [basketAtoms, setBasketAtoms] = useRecoilState(BasketState);

  const categories = useQuery(
    ["categories", { restaurantId }],
    getAllCategories
  );

  useEffect(() => {
    if (
      !!basketAtoms.order.length &&
      basketAtoms.order[0].category.restaurant._id !== restaurantId
    ) {
      setBasketAtoms((oldBasket) => {
        return {
          ...oldBasket,
          order: [],
        };
      });
    }
    // should only be called when the page is refreshed
    // eslint-disable-next-line
  }, []);

  return (
    <Flex
      direction="column"
      pl={theme.spacing(1)}
      pt={theme.spacing(1)}
      height={1}
      width={1}
      boxSizing="border-box"
    >
      <Text
        fontSize={theme.fontSize(3)}
        fontWeight="bold"
        mb={theme.spacing(1)}
      >
        {translations["menu"]}
      </Text>
      <Divider mb={theme.spacing(1)} />
      <Category
        restaurantId={restaurantId}
        tableId={tableId}
        onLocation={setLocation}
        categories={categories}
      />
    </Flex>
  );
};

export default memo(Menu);
