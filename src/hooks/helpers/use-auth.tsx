import { useEffect, useState } from "react";

import { IProfile } from "@/types/account";
import checkJWT from "@/utils/check-jwt";

import useGetAccount from "../queries/use-get-account";

const useAuth = () => {
  const [user, setUser] = useState<IProfile>();
  const tokenExists = checkJWT();

  const { refetch, isLoading } = useGetAccount({ tokenExists, setUser });

  const loggedIn = !!(tokenExists && user);
  const loggingIn = (!user && tokenExists) || isLoading;

  useEffect(() => {
    if (tokenExists && !user) refetch();
  }, [refetch, tokenExists, user]);

  return { user, loggedIn, loggingIn };
};

export default useAuth;
