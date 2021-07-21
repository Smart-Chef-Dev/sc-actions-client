export const getAllProducts = () =>
  fetch(`/api/products-stripe`).then((res) => res.json());

export const getAllPrices = () =>
  fetch(`/api/price-stripe`).then((res) => res.json());

export const getSubscriptions = async ({ jwt }) => {
  const res = await fetch(`/api/subscriptions`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  const body = await res.json();

  if (!res.ok) {
    throw body;
  }

  return body;
};

export const createCheckoutSession = ({ priceId, jwt }) =>
  fetch(`/api/price-stripe/${priceId}/create-checkout-session`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + jwt,
    },
  }).then((res) => res.text());
