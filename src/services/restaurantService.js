export const getRestaurantById = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}`).then((res) => res.json());
};

export const uploadFileInRestaurant = ({ restaurantId, file }) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`/api/restaurant/${restaurantId}/upload-photo`, {
    method: "POST",
    body: formData,
  }).then((res) => res.text());
};
