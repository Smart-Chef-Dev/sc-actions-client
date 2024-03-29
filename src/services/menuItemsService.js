import { fetchOptions } from "../utils/fetchOptions";

export const getMenuItemsByCategoryIdInLimit = ({
  queryKey,
  pageParam = { page: 0, limit: 13 },
}) => {
  const [, { categoryId }] = queryKey;

  return fetch(
    `/api/category/${categoryId}/menu-item/?page=${pageParam.page}&limit=${pageParam.limit}`
  ).then((res) => res.json());
};

export const getMenuItemsByCategoryId = ({ queryKey }) => {
  const [, { categoryId }] = queryKey;
  return fetch(`/api/category/${categoryId}/menu-item/`).then((res) =>
    res.json()
  );
};

export const getMenuItemsById = ({ queryKey }) => {
  const [, { itemId }] = queryKey;
  return fetch(`/api/menu/${itemId}`).then((res) => res.json());
};

export const createMenuItem = async ({ categoryId, body }) => {
  const res = await fetch(
    `/api/category/${categoryId}/menu-item`,
    fetchOptions({ method: "POST", body: JSON.stringify(body) })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const swapMenuItems = async ({ elementId1, elementId2 }) => {
  const res = await fetch(
    `/api/menu/${elementId1}/swap/${elementId2}`,
    fetchOptions({ method: "POST" })
  );

  if (!res.ok) {
    throw { status: res.status };
  }
};

export const deleteMenuItem = async ({ menuItemId }) => {
  const res = await fetch(
    `/api/menu/${menuItemId}`,
    fetchOptions({ method: "DELETE" })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const editMenuItem = async ({ menuItemId, body }) => {
  const res = await fetch(
    `/api/menu/${menuItemId}/update`,
    fetchOptions({ method: "POST", body: JSON.stringify(body) })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const findAllMenuItems = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;

  return fetch(`/api/restaurant/${restaurantId}/menu-items`).then((res) =>
    res.json()
  );
};
