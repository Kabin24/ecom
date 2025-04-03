import axios from "axios";
import { getFromLocalstorage } from "../utilities/helpers";
import { WebStorageConstant } from "./constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "request timed out",
  responseType: "json",
  responseEncoding: "utf-8",
});

// interceptors
axiosInstance.interceptors.request.use((config) => {
  const token = getFromLocalstorage(WebStorageConstant.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export default axiosInstance;
