import { lazy } from "react";
import { Routes } from "./routes";

import MainLayout from "../components/MainLayout";
import SimpleLayout from "../components/SimpleLayout";
import MenuBuilder from "../pages/back-office/menu-builder";
import BackOfficeLayout from "../components/backOfficeLayout";

const SingUp = lazy(() =>
  import("pages/back-office/sing-up" /* webpackChunkName: "sing-up" */)
);
const Dashboard = lazy(() =>
  import(
    "pages/back-office/subscriptions" /* webpackChunkName: "dashboard" */
  )
);
const SingIn = lazy(() =>
  import("pages/back-office/sing-in" /* webpackChunkName: "sing-in" */)
);
const Product = lazy(() =>
  import("pages/menu/product" /* webpackChunkName: "product" */)
);
const Basket = lazy(() =>
  import("pages/menu/basket" /* webpackChunkName: "basket" */)
);
const Menu = lazy(() =>
  import("pages/menu/main-menu" /* webpackChunkName: "menu" */)
);
const ExpandedMenu = lazy(() =>
  import("pages/menu/expanded-menu" /* webpackChunkName: "expanded-menu" */)
);
const QrCodeBuilder = lazy(() =>
  import("pages/qr-code-builder" /* webpackChunkName: "qr-code-builder" */)
);
const RestaurantLogin = lazy(() =>
  import("pages/restaurant-login" /* webpackChunkName: "restaurant-login" */)
);
const Actions = lazy(() =>
  import("pages/actions" /* webpackChunkName: "actions" */)
);

export const AppPages = [
  {
    path: Routes.SING_UP,
    component: SingUp,
    layout: MainLayout,
  },
  {
    path: Routes.SING_IN,
    component: SingIn,
    layout: MainLayout,
  },
  {
    path: Routes.DASHBOARD,
    component: Dashboard,
    layout: SimpleLayout,
    isPrivateRoute: true,
  },
  {
    path: Routes.PRODUCT,
    component: Product,
    layout: SimpleLayout,
    needMenu: true,
  },
  {
    path: Routes.BASKET,
    component: Basket,
    layout: SimpleLayout,
    needMenu: true,
  },
  {
    path: Routes.MENU,
    component: Menu,
    layout: SimpleLayout,
    needMenu: true,
  },
  {
    path: Routes.EXPANDED_MENU,
    component: ExpandedMenu,
    layout: SimpleLayout,
    needMenu: true,
  },
  {
    path: Routes.QR_CODE_BUILDER,
    component: QrCodeBuilder,
    layout: SimpleLayout,
  },
  {
    path: Routes.RESTAURANT_LOGIN,
    component: RestaurantLogin,
    layout: MainLayout,
  },
  {
    path: Routes.ACTIONS,
    component: Actions,
    layout: MainLayout,
  },
  {
    path: Routes.MENU_BUILDER,
    component: MenuBuilder,
    layout: BackOfficeLayout,
  },
];
