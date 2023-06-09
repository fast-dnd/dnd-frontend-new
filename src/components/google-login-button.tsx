"use client";

import { useRouter } from "next/navigation";
import authService from "@/services/authService";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";

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
