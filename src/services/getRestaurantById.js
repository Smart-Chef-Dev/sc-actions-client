const getRestaurantById = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}`).then((res) => res.json());
};

export default getRestaurantById;
