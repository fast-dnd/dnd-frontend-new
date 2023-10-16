"use client";

import React from "react";

import { Box } from "@/components/ui/box";
import useAuthCheck from "@/hooks/helpers/use-auth-check";

import GoogleLoginButton from "./components/google-login-button";

const Login = () => {
  useAuthCheck();

  return (
    <div className="nozoom mt-24 flex items-center justify-center">
      <div>
        <Box title="ACCOUNT" className="flex items-center justify-center p-8 lg:w-[450px]">
          <GoogleLoginButton />
        </Box>
      </div>
    </div>
  );
};

export default Login;
