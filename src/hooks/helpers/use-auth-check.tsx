import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useLocalStorage, useWindowSize } from "usehooks-ts";

import checkJWT from "@/utils/check-jwt";

const useAuthCheck = () => {
  const { width } = useWindowSize();

  const tokenExists = checkJWT();

  const pathname = usePathname();

  const [_, setRedirectURL] = useLocalStorage("redirectURL", pathname);

  useEffect(() => {
    if (pathname !== "/mobile-wip" && width !== 0 && width < 1024) redirect("/mobile-wip");
    if (pathname === "/mobile-wip" && width !== 0 && width >= 1024) redirect("/home");

    const nonAuthURLs = ["/guide", "/transcript", "/mobile-wip"];
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
  }, [pathname, setRedirectURL, tokenExists, width]);

  return;
};

export default useAuthCheck;
