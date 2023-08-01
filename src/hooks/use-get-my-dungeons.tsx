import { useQuery } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useGetMyDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: [dungeonKey, "myDungeons"],
    queryFn: dungeonService.getMyDungeons,
    enabled,
  });
};

export default useGetMyDungeons;
