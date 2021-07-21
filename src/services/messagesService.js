export const sendAction = ({ restaurantId, tableId, id }) =>
  fetch(`/api/message/${restaurantId}/${tableId}/${id}`, {
    method: "POST",
  });

export const sendOrder = ({ order, restaurantId, tableId }) =>
  fetch(`/api/message/${restaurantId}/${tableId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
