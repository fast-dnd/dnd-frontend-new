"use client";

import useAuthCheck from "@/hooks/use-auth-check";
import { queryClientConfig } from "@/utils/query-client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(new QueryClient(queryClientConfig));

  useAuthCheck();

  return (
    <GoogleOAuthProvider clientId="695030285071-oc4e483rn2791srvc7tep6a0dto8ltkr.apps.googleusercontent.com">
      <QueryClientProvider client={client}>
        {children}
        <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
