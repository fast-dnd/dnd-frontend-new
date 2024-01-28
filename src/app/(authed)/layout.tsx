"use client";

import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useIsClient } from "usehooks-ts";

import useCommunity from "@/hooks/helpers/use-community";
import { logout } from "@/utils/auth";

const AuthedLayout = ({ children }: React.PropsWithChildren) => {
  const { isDefault } = useCommunity();
  const isClient = useIsClient();
  const { connected, connecting } = useWallet();

  useEffect(() => {
    if (isClient && !isDefault && !connecting && !connected) logout();
  }, [connected, connecting, isClient, isDefault]);

  return <>{children}</>;
};

export default AuthedLayout;
