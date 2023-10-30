"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClientConfig } from "@/lib/query-client";

import "./legend-state";

import { Toaster } from "sonner";

import useAuthCheck from "@/hooks/helpers/use-auth-check";

import CustomWalletWrapper from "./wallet-wrapper";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(new QueryClient(queryClientConfig));

  useAuthCheck();

  return (
    <CustomWalletWrapper>
      <GoogleOAuthProvider clientId="695030285071-oc4e483rn2791srvc7tep6a0dto8ltkr.apps.googleusercontent.com">
        <QueryClientProvider client={client}>
          {children}
          <Toaster richColors />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </CustomWalletWrapper>
  );
};

export default Providers;
