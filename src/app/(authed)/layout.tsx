"use client";

import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useIsClient } from "usehooks-ts";

import { logout } from "@/utils/auth";

const AuthedLayout = ({ children }: React.PropsWithChildren) => {
  const isClient = useIsClient();
  const { connected, connecting } = useWallet();

  useEffect(() => {
    if (isClient && !connecting && !connected) logout();
  }, [connected, connecting, isClient]);

  return <>{children}</>;
};

export default AuthedLayout;
