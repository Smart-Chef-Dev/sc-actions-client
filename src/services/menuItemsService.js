export const MenuItemsServiceRouters = {
  GET_MENU_ITEMS_BY_ID: "GET_MENU_ITEMS_BY_ID",
  GET_MENU_ITEMS_BY_ID_IN_LIMIT: "GET_MENU_ITEMS_BY_ID_IN_LIMIT",
};

export const MenuItemsServices = ({
  itemId,
  categoryId,
  service,
  pageParam = { page: 0, limit: 13 },
}) => {
  if (MenuItemsServiceRouters.GET_MENU_ITEMS_BY_ID_IN_LIMIT === service) {
    return fetch(
      `/api/category/${categoryId}/menu-item/?page=${pageParam.page}&limit=${pageParam.limit}`
    ).then((res) => res.json());
  }

  if (MenuItemsServiceRouters.GET_MENU_ITEMS_BY_ID === service) {
    return fetch(`/api/menu/${itemId}`).then((res) => res.json());
  }
};
