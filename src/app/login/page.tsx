import GoogleLoginButton from "@/components/google-login-button";
import { Box } from "@/components/ui/box";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center mt-24">
      <Box title="ACCOUNT" className="w-[450px]">
        <div className="p-8">
          <GoogleLoginButton />
        </div>
      </Box>
    </div>
  );
};

export default Login;
