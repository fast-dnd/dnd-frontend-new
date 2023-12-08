import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";

const useGetRating = () => {
  return useQuery({
    queryKey: [accountKey, "rating"],
    queryFn: accountService.getRating,
  });
};

export default useGetRating;
