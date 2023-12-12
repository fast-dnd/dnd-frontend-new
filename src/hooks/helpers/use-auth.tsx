import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import useCheckJWT from "@/utils/check-jwt";

import useGetAccount from "../queries/use-get-account";

const useAuth = () => {
  const tokenExists = useCheckJWT();
  const [_, setAccountId] = useLocalStorage("accountId", "");

  const { data: user, refetch, isLoading } = useGetAccount({ tokenExists });

  const loggedIn = !!(tokenExists && user);
  const loggingIn = (!user && tokenExists) || isLoading;

  useEffect(() => {
    if (tokenExists && !user) refetch();
    if (user?.account._id) setAccountId(user.account._id);
  }, [refetch, setAccountId, tokenExists, user]);

  return { user, loggedIn, loggingIn };
};

export default useAuth;
