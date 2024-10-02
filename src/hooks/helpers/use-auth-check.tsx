import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useLocalStorage, useWindowSize } from "usehooks-ts";

import useCheckJWT from "@/utils/check-jwt";

import useCommunity from "./use-community";

const useAuthCheck = () => {
  const { width } = useWindowSize();

  const { communityId } = useCommunity();

  const tokenExists = useCheckJWT();

  const pathname = usePathname();

  const [_, setRedirectURL] = useLocalStorage("redirectURL", pathname);

  useEffect(() => {
    if (!pathname) return;

    const nonAuthURLs = ["/guide", "/transcript", "/ai-box", "/community-battles", "/mobile-wip"];
    const isNonAuthURL = nonAuthURLs.some((url) => pathname.includes(url));

    if (isNonAuthURL) return;

    if (!["/communities", "/login"].includes(pathname) && !communityId) {
      redirect("/communities");
    } else if (pathname === "/login") {
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
