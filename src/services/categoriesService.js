import { fetchOptions } from "../utils/fetchOptions";

export const getAllCategories = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}/category`).then((res) =>
    res.json()
  );
};

export const addCategories = ({ queryKey, body }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(
    `/api/restaurant/${restaurantId}/category`,
    fetchOptions({ method: "POST", body })
  ).then((res) => res.json());
};
