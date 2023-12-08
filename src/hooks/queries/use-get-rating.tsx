import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";

const useGetRating = ({ tokenExists }: { tokenExists: boolean }) => {
  return useQuery({
    queryKey: [accountKey, "rating"],
    queryFn: accountService.getRating,
    enabled: tokenExists,
  });
};

export default useGetRating;
