"use client";

import AuthProvider from "@/components/auth-provider";
import { queryClientConfig } from "@/utils/query-client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(new QueryClient(queryClientConfig));

  return (
    <GoogleOAuthProvider clientId="695030285071-oc4e483rn2791srvc7tep6a0dto8ltkr.apps.googleusercontent.com">
      <QueryClientProvider client={client}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </GoogleOAuthProvider>
  );
};

export default Providers;
