const getMenuItemsById = ({ queryKey }) => {
  const [, { itemId }] = queryKey;
  return fetch(`/api/menu/${itemId}`).then((res) => res.json());
};

export default getMenuItemsById;
