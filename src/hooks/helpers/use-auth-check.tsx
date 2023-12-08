import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useLocalStorage, useReadLocalStorage, useWindowSize } from "usehooks-ts";

import useCheckJWT from "@/utils/check-jwt";

const useAuthCheck = () => {
  const { width } = useWindowSize();

  const communityId = useReadLocalStorage<string>("communityId");

  const tokenExists = useCheckJWT();

  const pathname = usePathname();

  const [_, setRedirectURL] = useLocalStorage("redirectURL", pathname);

  useEffect(() => {
    const nonAuthURLs = ["/guide", "/transcript", "/mobile-wip"];
    const isNonAuthURL = nonAuthURLs.some((url) => pathname?.includes(url));

    if (!["/communities", "/login"].includes(pathname) && !communityId) {
      redirect("/communities");
    }

    if (isNonAuthURL) return;
    else if (pathname === "/login") {
      if (tokenExists) {
        redirect("/home");
      }
    } else {
      if (!tokenExists) {
        setRedirectURL(pathname);
        redirect("/login");
      }
    }
  }, [pathname, setRedirectURL, tokenExists, width, communityId]);

  return;
};

export default useAuthCheck;
