export const getMenuItemsByCategoryIdInLimit = ({
  queryKey,
  pageParam = { page: 0, limit: 13 },
}) => {
  const [, { categoryId }] = queryKey;

  return fetch(
    `/api/category/${categoryId}/menu-item/?page=${pageParam.page}&limit=${pageParam.limit}`
  ).then((res) => res.json());
};

export const getMenuItemsByCategoryId = ({ queryKey }) => {
  const [, { categoryId }] = queryKey;
  return fetch(`/api/category/${categoryId}/menu-item/`).then((res) =>
    res.json()
  );
};

export const getMenuItemsById = ({ queryKey }) => {
  const [, { itemId }] = queryKey;
  return fetch(`/api/menu/${itemId}`).then((res) => res.json());
};
