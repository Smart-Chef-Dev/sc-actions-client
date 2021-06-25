import { useLocation, useRoute } from "wouter";
import { memo, useCallback } from "react";

import MenuIcon from "assets/icons/menu-tabs/menu-icon.svg";
import MenuIconDedicated from "assets/icons/menu-tabs/menu-icon-dedicated.svg";

import BasketIcon from "assets/icons/menu-tabs/icon-basket.svg";
import BasketIconDedicated from "assets/icons/menu-tabs/icon-basket-dedicated.svg";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { theme } from "theme";

const MenuTabs = () => {
  const [, setLocation] = useLocation();

  const [menu, menuParams] = useRoute(Routes.MENU);
  const [expandedMenu, expandedMenuParams] = useRoute(Routes.EXPANDED_MENU);
  const [product, productParams] = useRoute(Routes.PRODUCT);
  const [basket, basketParams] = useRoute(Routes.BASKET);

  const goToTheMenu = useCallback(() => {
    if (basket) {
      setLocation(
        `/restaurant/${basketParams.restaurantId}/${basketParams.tableId}`
      );
    } else if (product) {
      setLocation(
        `/restaurant/${productParams.restaurantId}/${productParams.tableId}`
      );
    } else if (expandedMenu) {
      setLocation(
        `/restaurant/${expandedMenuParams.restaurantId}/${expandedMenuParams.tableId}`
      );
    }
  }, [
    setLocation,
    basket,
    basketParams,
    product,
    expandedMenu,
    expandedMenuParams,
    productParams,
  ]);

  const goToTheOrder = useCallback(() => {
    if (menu) {
      setLocation(`/basket/${menuParams.restaurantId}/${menuParams.tableId}`);
    } else if (expandedMenu) {
      setLocation(
        `/basket/${expandedMenuParams.restaurantId}/${expandedMenuParams.tableId}`
      );
    } else if (productParams) {
      setLocation(
        `/basket/${productParams.restaurantId}/${productParams.tableId}`
      );
    }
  }, [
    setLocation,
    expandedMenu,
    expandedMenuParams,
    menuParams,
    menu,
    productParams,
  ]);

  return (
    <>
      {menu || expandedMenu || product ? (
        <Flex p={theme.spacing(1)}>
          <MenuIconDedicated onClick={goToTheMenu} />
        </Flex>
      ) : (
        <Flex p={theme.spacing(1)}>
          <MenuIcon fill="var(--main-text-color)" onClick={goToTheMenu} />
        </Flex>
      )}

      {basket ? (
        <Flex p={theme.spacing(1)}>
          <BasketIconDedicated onClick={goToTheOrder} />
        </Flex>
      ) : (
        <Flex p={theme.spacing(1)}>
          <BasketIcon fill="var(--main-text-color)" onClick={goToTheOrder} />
        </Flex>
      )}
    </>
  );
};

export default memo(MenuTabs);
