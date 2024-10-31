import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

import { logout } from "@/utils/auth";
import { env } from "@/utils/env.mjs";

import { GuestData } from "@/app/(non-authed)/guest/hooks/use-guest";

const handleInterceptors = (apiInstance: AxiosInstance) => {
  apiInstance.defaults.headers.common["Content-Type"] = "application/json";

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.status === 401) {
          logout();
        }
        toast.error(error.response.data.message);
      }
      return Promise.reject(error);
    },
  );

  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken");
      const guestData = localStorage.getItem("guest");

      if (token) {
        config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
      }
      if (guestData) {
        try {
          const guest = JSON.parse(guestData) as GuestData;
          if (guest.guestId) {
            config.headers["x-guest-id"] = guest.guestId;
          }
          if (guest.guestName) {
            config.headers["x-guest-name"] = guest.guestName;
          }
        } catch (e) {
          console.error("Failed to parse guest data from localStorage:", e);
          // Optionally handle the error, e.g., clear invalid guest data
          localStorage.removeItem("guest");
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

interface IApiOptions extends AxiosRequestConfig {
  commonPrefix?: string;
  port?: number;
  prodURL?: string;
}

const createApi = (options: IApiOptions) => {
  const { commonPrefix, port, prodURL, ...rest } = options;

  const api = axios.create({
    baseURL: `${BACKEND_URL}v1/${commonPrefix ?? ""}`,
    headers: {
      "Content-Type": "application/json",
    },
    ...rest,
  });

  handleInterceptors(api);

  return api;
};

export default createApi;

export const BACKEND_URL =
  env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://api-dev.v3rpg.com/"
    : "https://api-dev-test.v3rpg.com/";

export const PAGINATION_LIMIT = 5;
