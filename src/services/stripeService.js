import { fetchOptions } from "../utils/fetchOptions";

export const getAllProducts = () =>
  fetch(`/api/products-stripe`).then((res) => res.json());

export const getAllPrices = () =>
  fetch(`/api/products-stripe/price`).then((res) => res.json());

export const getSubscriptions = async ({ jwt }) => {
  const res = await fetch(
    `/api/users/subscription`,
    fetchOptions({ method: "GET", jwt })
  );

  const body = await res.json();

  if (!res.ok) {
    throw body;
  }

  return body;
};

export const createCheckoutSession = ({ priceId, jwt }) =>
  fetch(
    `/api/products-stripe/price/${priceId}/create-checkout-session`,
    fetchOptions({ method: "POST", jwt })
  ).then((res) => res.text());

export const deleteSubscriptions = ({ jwt }) =>
  fetch(`/api/users/subscription`, fetchOptions({ method: "DELETE", jwt }));
