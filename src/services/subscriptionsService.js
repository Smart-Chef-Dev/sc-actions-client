export const getAllSubscriptions = () => {
  return fetch(`/api/subscriptions`).then((res) => res.json());
};

export const getAllSubscriptionsPrices = () => {
  return fetch(`/api/subscriptions/prices`).then((res) => res.json());
};
