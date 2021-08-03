import { fetchOptions } from "../utils/fetchOptions";

export const signInAccount = async ({ body }) => {
  const res = await fetch(
    `/api/users/sing-in`,
    fetchOptions({ method: "POST", body: JSON.stringify(body) })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.text();
};

export const signUpAccount = async ({ body }) => {
  const res = await fetch(
    `/api/users/sign-up`,
    fetchOptions({ method: "POST", body: JSON.stringify(body) })
  );

  if (!res.ok) {
    throw { status: res.status };
  }

  return res.json();
};
