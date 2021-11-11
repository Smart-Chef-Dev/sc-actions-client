import { fetchOptions } from "../utils/fetchOptions";

export const sendAction = ({ restaurantId, tableId, id }) =>
  fetch(`/api/message/${restaurantId}/${tableId}/${id}`, {
    method: "POST",
  });

export const sendOrder = ({ order, restaurantId, tableId }) =>
  fetch(
    `/api/message/${restaurantId}/${tableId}`,
    fetchOptions({ method: "POST", body: JSON.stringify(order) })
  );
