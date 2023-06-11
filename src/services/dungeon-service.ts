import { IDungeon } from "@/types/dnd";
import createApi from "./api-factory";
import { IDungeonFormData } from "@/app/(authed)/create-dungeon/[[...dungeonId]]/stores/form-store";

const dungeonApi = createApi({ commonPrefix: "dungeons/" });

const getDungeon = async (dungeonId: string) => {
  return await dungeonApi.get<IDungeon>(dungeonId).then((res) => res.data);
};

const getDungeons = async () => {
  return await dungeonApi.get<IDungeon[]>("").then((res) => res.data);
};

const getRecommendedDungeons = async () => {
  return await dungeonApi.get<IDungeon[]>("recommended").then((res) => res.data);
};

const createDungeon = async (data: IDungeonFormData) => {
  return await dungeonApi.post<IDungeon>("", data);
};

const updateDungeon = async (data: IDungeonFormData) => {
  return await dungeonApi.put<IDungeon>("", data);
};

const deleteDungeon = async (dungeonId: string) => {
  return await dungeonApi.delete(dungeonId);
};

const dungeonService = {
  createDungeon,
  updateDungeon,
  getDungeon,
  getDungeons,
  getRecommendedDungeons,
  deleteDungeon,
};

export default dungeonService;
