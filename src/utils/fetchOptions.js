export const fetchOptions = ({ method, body, isJwt }) => {
  const options = { method: method };

  if (body) {
    options.body = body;
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  if (isJwt) {
    const recoilPersist = JSON.parse(localStorage.getItem("recoil-persist"));
    const jwt = recoilPersist?.UserDataState?.jwt ?? null;

    options.headers = {
      ...options.headers,
      Authorization: "Bearer " + jwt,
    };
  }

  return options;
};
