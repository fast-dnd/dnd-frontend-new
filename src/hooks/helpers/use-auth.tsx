import { useEffect } from "react";

import checkJWT from "@/utils/check-jwt";

import useGetAccount from "../queries/use-get-account";

const useAuth = () => {
  const tokenExists = checkJWT();

  const { data: user, refetch, isLoading } = useGetAccount({ tokenExists });

  const loggedIn = !!(tokenExists && user);
  const loggingIn = (!user && tokenExists) || isLoading;

  useEffect(() => {
    if (tokenExists && !user) refetch();
  }, [refetch, tokenExists, user]);

  return { user, loggedIn, loggingIn };
};

export default useAuth;
