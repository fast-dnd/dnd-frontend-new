import { useQuery } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useGetDungeons = () => {
  return useQuery({
    queryKey: [dungeonKey],
    queryFn: dungeonService.getDungeons,
  });
};

export default useGetDungeons;
