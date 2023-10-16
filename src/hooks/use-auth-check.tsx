import { useEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

import useCheckJWT from "@/utils/check-jwt";

const useAuthCheck = () => {
  const tokenExists = useCheckJWT();
  const pathname = usePathname();
  const router = useRouter();

  const [_, setRedirectURL] = useLocalStorage("redirectURL", pathname);

  useEffect(() => {
    const nonAuthURLs = ["/guide", "/transcript"];
    const isNonAuthURL = nonAuthURLs.some((url) => pathname?.includes(url));

    if (isNonAuthURL) return;
    else if (pathname === "/login") {
      if (tokenExists) redirect("/home");
    } else {
      if (!tokenExists) {
        setRedirectURL(pathname);
        redirect("/login");
      }
    }
  }, [pathname, router, setRedirectURL, tokenExists]);

  return;
};

export default useAuthCheck;
