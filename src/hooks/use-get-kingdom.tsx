import { useQuery } from "@tanstack/react-query";

import kingdomService, { kingdomKey } from "@/services/kingdom-service";

export const useGetKingdom = () => {
  return useQuery({
    queryKey: [kingdomKey],
    queryFn: kingdomService.getKingdom,
  });
};
