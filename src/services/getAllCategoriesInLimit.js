const getAllCategoriesInLimit = ({
  queryKey,
  pageParam = { page: 0, limit: 5 },
}) => {
  const [, { restaurantId }] = queryKey;

  return fetch(
    `/api/restaurant/${restaurantId}/category/?page=${pageParam.page}&limit=${pageParam.limit}`
  ).then((res) => res.json());
};

export default getAllCategoriesInLimit;
