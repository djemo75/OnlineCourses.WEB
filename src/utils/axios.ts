import axios from "axios";
import Qs from "qs";
import { isNode } from "./isNode";

export const axiosSetup = () => {
  if (isNode()) return;

  axios.defaults.paramsSerializer = (params) =>
    Qs.stringify(params, { arrayFormat: "repeat" });

  axios.defaults.withCredentials = true;
};

export const updateAxiosAccessToken = (accessToken: string | null) => {
  if (isNode()) return;

  if (accessToken === null) {
    axios.defaults.headers.common["Authorization"] = "";
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
};
