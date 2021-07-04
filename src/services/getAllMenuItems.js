const getAllMenuItems = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}/menu-items`).then((res) =>
    res.json()
  );
};

export default getAllMenuItems;
