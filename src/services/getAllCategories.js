const getAllCategories = ({ queryKey }) => {
  const [, { restaurantId }] = queryKey;
  return fetch(`/api/restaurant/${restaurantId}/category`).then((res) =>
    res.json()
  );
};

export default getAllCategories;
