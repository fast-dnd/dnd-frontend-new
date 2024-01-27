"use client";

import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useIsClient } from "usehooks-ts";

import useCommunity from "@/hooks/helpers/use-community";

const AuthedLayout = ({ children }: React.PropsWithChildren) => {
  const { isDefault } = useCommunity();
  const isClient = useIsClient();
  const { connected, connecting, connect } = useWallet();

  useEffect(() => {
    const conn = async () => {
      if (isClient && !isDefault && !connecting && !connected) await connect();
    };

    conn();
  }, [connect, connected, connecting, isClient, isDefault]);

  return <>{children}</>;
};

export default AuthedLayout;
