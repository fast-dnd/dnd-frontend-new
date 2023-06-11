"use client";

import checkJWT from "@/utils/check-jwt";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

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
