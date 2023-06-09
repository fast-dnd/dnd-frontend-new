"use client";

import AuthProvider from "@/components/auth-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <GoogleOAuthProvider clientId="695030285071-oc4e483rn2791srvc7tep6a0dto8ltkr.apps.googleusercontent.com">
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </GoogleOAuthProvider>
  );
};

export default Providers;
