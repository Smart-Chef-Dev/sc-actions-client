import { fetchOptions } from "../utils/fetchOptions";

export const getAllCategories = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}/category`).then((res) =>
    res.json()
  );
};

export const addCategory = async ({ restaurantId, body }) => {
  const res = await fetch(
    `/api/restaurant/${restaurantId}/category`,
    fetchOptions({ method: "POST", body: JSON.stringify(body) })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const deleteCategory = async ({ categoryId }) => {
  const res = await fetch(
    `/api/category/${categoryId}`,
    fetchOptions({ method: "DELETE" })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const editCategory = async ({ categoryId, body }) => {
  const res = await fetch(
    `/api/category/${categoryId}/update`,
    fetchOptions({ method: "POST", body: JSON.stringify(body) })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const swapCategories = async ({ elementId1, elementId2 }) => {
  const res = await fetch(
    `/api/category/${elementId1}/swap/${elementId2}`,
    fetchOptions({ method: "POST" })
  );

  if (!res.ok) {
    throw { status: res.status };
  }
};
