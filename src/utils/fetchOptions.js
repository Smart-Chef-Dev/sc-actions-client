export const fetchOptions = ({ method, body }) => {
  const options = { method: method };

  if (body) {
    options.body = body;
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  const recoilPersist = JSON.parse(
    localStorage.getItem("recoil-persist") ?? "{}"
  );
  const jwt = recoilPersist?.UserDataState?.jwt;
  if (jwt) {
    options.headers = {
      ...options.headers,
      Authorization: "Bearer " + jwt,
    };
  }

  return options;
};
