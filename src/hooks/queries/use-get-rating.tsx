import { useQuery } from "@tanstack/react-query";
import { useReadLocalStorage } from "usehooks-ts";

import accountService, { accountKey } from "@/services/account-service";

const useGetRating = () => {
  const communityId = useReadLocalStorage<string>("communityId") ?? "";

  return useQuery({
    queryKey: [accountKey, communityId, "rating"],
    queryFn: () => accountService.getRating(communityId),
    enabled: !!communityId,
  });
};

export default useGetRating;
