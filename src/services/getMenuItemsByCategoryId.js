const getMenuItemsByCategoryId = ({ queryKey }) => {
  const [, { categoryId }] = queryKey;
  return fetch(`/api/category/${categoryId}/menu-item`).then((res) =>
    res.json()
  );
};

export default getMenuItemsByCategoryId;
