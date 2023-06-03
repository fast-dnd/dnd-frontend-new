import GoogleLoginButton from "@/components/google-login-button";
import { Box } from "@/components/ui/box";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center mt-24">
      <Box title="ACCOUNT" className="w-[450px] p-8 flex items-center justify-center">
        <GoogleLoginButton />
      </Box>
    </div>
  );
};

export default Login;
