const sendAction = ({ restaurantId, tableId, id }) =>
  fetch(`/api/message/${restaurantId}/${tableId}/${id}`, {
    method: "POST",
  });

export default sendAction;
