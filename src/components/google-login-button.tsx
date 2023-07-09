"use client";

import React from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth-service";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const router = useRouter();

  const redirectURL = typeof window !== "undefined" ? localStorage.getItem("redirectURL") : null;
  const redirectTo = redirectURL ? redirectURL : "/home";

  return (
    <GoogleLogin
      onSuccess={(response) => authService.login(response).then(() => router.push(redirectTo))}
    />
  );
};

export default GoogleLoginButton;
