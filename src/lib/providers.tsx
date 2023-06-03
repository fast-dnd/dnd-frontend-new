"use client";

import AuthProvider from "@/components/auth-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <GoogleOAuthProvider clientId="695030285071-oc4e483rn2791srvc7tep6a0dto8ltkr.apps.googleusercontent.com">
      <AuthProvider>{children}</AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
