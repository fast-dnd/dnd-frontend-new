import GoogleLoginButton from "@/components/google-login-button";
import { Box } from "@/components/ui/box";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center mt-24">
      <div>
        <Box title="ACCOUNT" className="md:w-[450px] p-8 flex items-center justify-center">
          <GoogleLoginButton />
        </Box>
      </div>
    </div>
  );
};

export default Login;
