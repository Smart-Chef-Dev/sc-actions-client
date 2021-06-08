import { useLocation, useRoute } from "wouter";
import { memo, useCallback } from "react";
import { styled } from "@linaria/react";

import MenuIcon from "./icon_menu.svg";
import MenuIconDedicated from "./icon_menu_dedicated.svg";

import BasketIcon from "./icon_basket.svg";
import BasketIconDedicated from "./icon_basket_dedicated.svg";

import { Routes } from "constants/routes";

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
    }
  }, [setLocation, basket, basketParams]);

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
        <Img>
          <MenuIconDedicated onClick={goToTheMenu} />
        </Img>
      ) : (
        <Img>
          <MenuIcon fill="var(--main-text-color)" onClick={goToTheMenu} />
        </Img>
      )}

      {basket ? (
        <Img>
          <BasketIconDedicated onClick={goToTheOrder} />
        </Img>
      ) : (
        <Img>
          <BasketIcon fill="var(--main-text-color)" onClick={goToTheOrder} />
        </Img>
      )}
    </>
  );
};

const Img = styled.div`
  //width: 18em;
  padding: 1rem;
`;

export default memo(MenuTabs);
