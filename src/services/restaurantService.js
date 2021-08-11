import { fetchOptions } from "../utils/fetchOptions";

export const getRestaurantById = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}`).then((res) => res.json());
};

export const checkingUserAccess = async ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  const res = await fetch(
    `/api/restaurant/${restaurantId}/user/verification-of-rights`,
    fetchOptions({ method: "GET" })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};

export const uploadFileInRestaurant = ({ restaurantId, file }) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(
    `/api/restaurant/${restaurantId}/upload-photo`,
    fetchOptions({ method: "POST", file: formData })
  ).then((res) => res.text());
};
