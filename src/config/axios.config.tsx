import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "request timed out",
  responseType: "json",
  responseEncoding: "utf-8",
});

export default axiosInstance;
