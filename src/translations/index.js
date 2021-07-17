import actionsEn from "./en/actions.json";
import actionsRu from "./ru/actions.json";

import restaurantLoginEn from "./en/restaurant-login.json";
import restaurantLoginRu from "./ru/restaurant-login.json";

import singInEn from "./en/sing-in.json";
import singInRu from "./ru/sing-in.json";

import singUpEn from "./en/sing-up.json";
import singUpRu from "./ru/sing-up.json";

import mainMenuEn from "./en/menu.json";
import mainMenuRu from "./ru/menu.json";

import expandedMenuEn from "./en/expanded-menu.json";
import expandedMenuRu from "./ru/expanded-menu.json";

import productEn from "./en/product.json";
import productRu from "./ru/product.json";

import basketEn from "./en/basket.json";
import basketRu from "./ru/basket.json";

import addonsEn from "./en/addons.json";
import addonsRu from "./ru/addons.json";

export const languages = {
  en: {
    actions: actionsEn,
    restaurantLogin: restaurantLoginEn,
    mainMenu: mainMenuEn,
    expandedMenu: expandedMenuEn,
    product: productEn,
    basket: basketEn,
    addons: addonsEn,
    singIn: singInEn,
    singUp: singUpEn,
  },
  ru: {
    actions: actionsRu,
    restaurantLogin: restaurantLoginRu,
    singIn: singInRu,
    singUp: singUpRu,
    mainMenu: mainMenuRu,
    expandedMenu: expandedMenuRu,
    product: productRu,
    basket: basketRu,
    addons: addonsRu,
  },
};
