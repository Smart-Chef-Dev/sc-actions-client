import { fetchOptions } from "../utils/fetchOptions";

export const addAddonIntoRestaurant = async ({ restaurantId, body }) => {
  const res = await fetch(
    `/api/restaurant/${restaurantId}/addon`,
    fetchOptions({ method: "POST", body: JSON.stringify(body) })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const addAddonIntoMenuItem = async ({ menuItemId, addonId }) => {
  const res = await fetch(
    `/api/menu/${menuItemId}/addon/${addonId}`,
    fetchOptions({ method: "POST" })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const getRestaurantAddons = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}/addon`).then((res) =>
    res.json()
  );
};
