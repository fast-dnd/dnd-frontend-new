import { useQuery } from "@tanstack/react-query";

import dndService from "@/services/dnd-service";

export const useGetKingdom = () => {
  return useQuery({
    queryKey: ["kingdom"],
    queryFn: dndService.getKingdom,
  });
};
