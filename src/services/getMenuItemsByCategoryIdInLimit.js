const getMenuItemsByCategoryIdInLimit = ({
  queryKey,
  pageParam = { page: 0, limit: 13 },
}) => {
  const [, { categoryId }] = queryKey;

  return fetch(
    `/api/category/${categoryId}/menu-item/?page=${pageParam.page}&limit=${pageParam.limit}`
  ).then((res) => res.json());
};

export default getMenuItemsByCategoryIdInLimit;
