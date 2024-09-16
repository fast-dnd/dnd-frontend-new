import { validateTournamentsResponseSchema } from "@/validations/tournaments";

import createApi from "./api-factory";

const tournamentsApi = createApi({ commonPrefix: "tournaments" });

const getLatestTournament = async () => {
  return await tournamentsApi
    .get("latest")
    .then((res) => validateTournamentsResponseSchema.parse(res.data));
};

const tournamentService = {
  getLatestTournament,
};

export default tournamentService;
