export const MessengerServicesRouters = {
  SEND_ACTION: "SEND_ACTION",
  SEND_ORDER: "SEND_ORDER",
};

export const MessengerService = ({
  order,
  restaurantId,
  tableId,
  id,
  service,
}) => {
  if (MessengerServicesRouters.SEND_ACTION === service) {
    return fetch(`/api/message/${restaurantId}/${tableId}/${id}`, {
      method: "POST",
    });
  }

  if (MessengerServicesRouters.SEND_ORDER === service) {
    return fetch(`/api/message/${restaurantId}/${tableId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  }
};
