import { memo, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import Loader from "components/loader";
import Categories from "./components/categories";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

import BasketState from "atoms/basket";
import getAllCategories from "services/getAllCategories";

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

  return !categories.isLoading ? (
    <Flex
      direction="column"
      pl={theme.spacing(1)}
      pt={theme.spacing(1)}
      height={1}
      width={1}
      boxSizing="border-box"
      overflowY="hidden"
    >
      <Flex height={1} width={1} direction="column" flex={1}>
        <Text
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
          mb={theme.spacing(1)}
        >
          {translations["menu"]}
        </Text>
        <Divider mb={theme.spacing(1)} />
      </Flex>

      <Categories
        restaurantId={restaurantId}
        tableId={tableId}
        onLocation={setLocation}
        categories={categories}
      />
    </Flex>
  ) : (
    <>
      <Loader />
    </>
  );
};

export default memo(Menu);
