import actionsEn from "./en/actions.json";
import actionsRu from "./ru/actions.json";

import restaurantLoginEn from "./en/restaurant-login.json";
import restaurantLoginRu from "./ru/restaurant-login.json";

import singInEn from "./en/sing-in.json";
import singInRu from "./ru/sing-in.json";

import singUpEn from "./en/sing-up.json";
import singUpRu from "./ru/sing-up.json";

export const languages = {
  en: {
    actions: actionsEn,
    restaurantLogin: restaurantLoginEn,
    singIn: singInEn,
    singUp: singUpEn,
  },
  ru: {
    actions: actionsRu,
    restaurantLogin: restaurantLoginRu,
    singIn: singInRu,
    singUp: singUpRu,
  },
};
