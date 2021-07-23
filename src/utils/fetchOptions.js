export const fetchOptions = ({ method, body, jwt }) => {
  const options = { method: method };

  if (body) {
    options.body = body;
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  if (jwt) {
    options.headers = {
      ...options.headers,
      Authorization: "Bearer " + jwt,
    };
  }

  return options;
};
