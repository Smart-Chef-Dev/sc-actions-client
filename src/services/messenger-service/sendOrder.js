const sendOrder = ({ order, restaurantId, tableId }) =>
  fetch(`/api/message/${restaurantId}/${tableId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

export default sendOrder;
