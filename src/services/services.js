import { HUNGRYHUB } from "../constants/serviceUrl";

const getFetchConfig = (method, payload, signal) => {
  if (method === "GET") {
    return {
      method: method,
      cache: "no-cache",
      mode: "cors",
      signal: signal, //For AbortController
    };
  }
  if (method === "POST") {
    return {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      signal: signal, //For AbortController
      body: JSON.stringify(payload),
      header: {
        "Content-Type": "application/json",
      },
    };
  }
};

export const getUsers = async (payload) => {
  let _url = HUNGRYHUB;
  return fetch(_url, getFetchConfig("POST", payload))
    .then((data) => data.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};
