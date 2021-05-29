import { memo, useCallback } from "react";

import MenuIcon from "./icon_menu.svg";
import MenuIconDedicated from "./icon_menu_dedicated.svg";

import BasketIcon from "./icon_basket.svg";
import BasketIconDedicated from "./icon_basket_dedicated.svg";

// import { theme } from "../../theme";
import { useLocation, useRoute } from "wouter";
import { Routes } from "../../constants/routes";
import { styled } from "@linaria/react";

const MenuTabs = () => {
  const [, setLocation] = useLocation();

  const [menu] = useRoute(Routes.MENU);
  const [expandedMenu] = useRoute(Routes.EXPANDED_MENU);
  const [product] = useRoute(Routes.PRODUCT);
  const [basket] = useRoute(Routes.BASKET);

  const goToTheMenu = useCallback(() => {
    setLocation(Routes.MENU);
  }, [setLocation]);

  const goToTheOrder = useCallback(() => {
    setLocation(Routes.BASKET);
  }, [setLocation]);

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
