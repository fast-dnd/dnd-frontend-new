import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const handleInterceptors = (apiInstance: AxiosInstance) => {
  apiInstance.defaults.headers.common["Content-Type"] = "application/json";

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("jwtToken");
        redirect("/");
      }
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      //   return Promise.reject(error);
    }
  );

  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken");

      if (token) config.headers["Authorization"] = `Bearer ${token}`;

      return config;
    },
    (error) => Promise.reject(error)
  );
};

interface IApiOptions extends AxiosRequestConfig {
  commonPrefix: string;
  port: number;
  prodURL: string;
}

const createApi = (options?: IApiOptions) => {
  const api = axios.create({
    baseURL: BACKEND_URL + "v1/",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  handleInterceptors(api);

  return api;
};

export default createApi;

export const BACKEND_URL = "https://api-dev.fastdnd.net/";
