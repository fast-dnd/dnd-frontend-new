"use client";

import React from "react";

import useAuthCheck from "@/hooks/use-auth-check";
import Navbar from "@/components/navbar";

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
