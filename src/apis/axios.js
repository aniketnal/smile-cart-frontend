import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";
// ...

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

// request aane ke pehle edits
const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

// response dene se pehle edits
const responseInterceptors = () => {
  axios.interceptors.response.use(response => {
    transformResponseKeysToCamelCase(response);

    return response.data;
  });
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
}
