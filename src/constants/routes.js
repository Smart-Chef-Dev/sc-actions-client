export const Routes = {
  RESTAURANT_LOGIN: "/:restaurantId",
  ACTIONS: "/:restaurantId/:tableId",
  QR_CODE_BUILDER: "/qr-code-builder",
  SING_UP: "/back-office/sing-up",
  SING_IN: "/back-office/sing-in",
  DASHBOARD: "/back-office/dashboard",
  MENU_BUILDER: "/back-office/menu/:restaurantId",
  MENU: "/restaurant/:restaurantId/:tableId",
  EXPANDED_MENU: "/restaurant/:restaurantId/:tableId/:categoryId",
  PRODUCT: "/restaurant/:restaurantId/:tableId/item/:itemId",
  BASKET: "/basket/:restaurantId/:tableId",
};
