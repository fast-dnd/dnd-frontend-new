import { useQuery } from "@tanstack/react-query";

import tournamentService, { tournamentKey } from "@/services/tournament-service";

const useGetTournament = () => {
  return useQuery({
    queryKey: [tournamentKey],
    queryFn: () => tournamentService.getTournament(),
  });
};

export default useGetTournament;
