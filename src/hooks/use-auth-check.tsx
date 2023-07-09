"use client";

import { useEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";

import checkJWT from "@/utils/check-jwt";

const useAuthCheck = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/login") {
      if (checkJWT()) router.back();
    } else {
      if (!checkJWT()) {
        localStorage.setItem("redirectURL", pathname);
        redirect("/login");
      }
    }
  }, [pathname, router]);

  return;
};

export default useAuthCheck;
