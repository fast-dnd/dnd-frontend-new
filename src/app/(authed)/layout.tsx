"use client";

import React from "react";

import Navbar from "@/components/navbar";
import useAuthCheck from "@/hooks/use-auth-check";

const AuthedLayout = ({ children }: React.PropsWithChildren) => {
  useAuthCheck();

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthedLayout;
