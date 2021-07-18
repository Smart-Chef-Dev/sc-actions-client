export const restaurantService = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}`).then((res) => res.json());
};

export default restaurantService;
