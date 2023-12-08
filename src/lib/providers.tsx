"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClientConfig } from "@/lib/query-client";

import "./legend-state";

import { Toaster } from "sonner";

import useAuthCheck from "@/hooks/helpers/use-auth-check";
import useGetDefaultCommunity from "@/hooks/queries/use-get-default-community";
import { env } from "@/utils/env.mjs";

import CustomWalletProvider from "./wallet-provider";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(new QueryClient(queryClientConfig));

  useAuthCheck();

  useGetDefaultCommunity();

  return (
    <CustomWalletProvider>
      <GoogleOAuthProvider clientId={env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}>
        <QueryClientProvider client={client}>
          {children}
          <Toaster richColors />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </CustomWalletProvider>
  );
};

export default Providers;
