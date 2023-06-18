import dndService from "@/services/dnd-service";
import { useQuery } from "@tanstack/react-query";

export const useGetKingdom = () => {
  return useQuery({
    queryKey: ["kingdom"],
    queryFn: dndService.getKingdom,
  });
};
