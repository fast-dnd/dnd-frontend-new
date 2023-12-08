import { useEffect } from "react";

import checkJWT from "@/utils/check-jwt";

import useGetAccount from "../queries/use-get-account";
import useGetRating from "../queries/use-get-rating";

const useAuth = () => {
  const tokenExists = checkJWT();

  const {
    data: user,
    refetch: refetchUser,
    isLoading: isLoadingUser,
  } = useGetAccount({ tokenExists });
  const {
    data: rating,
    refetch: refetchRating,
    isLoading: isLoadingRating,
  } = useGetRating({ tokenExists });

  const loggedIn = !!(tokenExists && user && rating);
  const loggingIn = (!user && !rating && tokenExists) || isLoadingUser || isLoadingRating;

  useEffect(() => {
    if (tokenExists && (!user || !rating)) {
      refetchUser();
      refetchRating();
    }
  }, [refetchUser, refetchRating, tokenExists, user, rating]);

  return { user, rating, loggedIn, loggingIn };
};

export default useAuth;
