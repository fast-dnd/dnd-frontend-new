import { IChampion, IDungeon, ILocation, IPlayer, IRoom, MoveType } from "@/types/dnd";

import createApi from "./apiFactory";

const dndApi = createApi();

const createRoom = async (data: {
  generateImages: boolean;
  generateAudio: boolean;
  templateSentences?: string;
  dungeon?: string;
}) => {
  return await dndApi.post<IRoom>("room", data);
};

const joinRoom = async (data: { link: string }) => {
  return await dndApi.post<IRoom>("room/join", data);
};

export interface IRoomData {
  state: "CREATING" | "GAMING" | "CLOSED";
  moves: string[];
  playerState: IPlayer[];
  roundEndsAt: string | null;
  dungeonId: string;
  link: string;
  queuedMoves: string[];
  currentRound: number;
  chatGptResponses: string[];
  generatedImages: string[];
  generateImages: boolean;
  generatedAudio: string[];
  generateAudio: string;
  location: ILocation;
  adventureMission: string;
  conversationId: string;
  image?: string;
}

export interface IPlayerMove {
  accountId: string;
  moveType: MoveType;
  message: string;
  dice: number;
  aiRating: number;
  aiDescriptionForRating: string;
}

const getRoomData = async (conversationId: string) => {
  return await dndApi.get<IRoomData>(`room/${conversationId}/`);
};

export interface IAvatar {
  _id: string;
  name: string;
  energy: number;
  level: number;
  kingdomId: string;
  label: string;
  image?: string;
}

export interface IKingdom {
  avatars: IAvatar[];
  name: string;
  gold: number;
}

const getKingdom = async () => {
  return await dndApi.get<IKingdom>("kingdom");
};

const createAvatar = async (data: { name: string }) => {
  return await dndApi.post("avatar", data);
};

const startGame = async (data: { conversationId: string }) => {
  return await dndApi.post("room/start", data);
};

interface IEditChampion {
  conversationId: string;
  championId: string;
}

const editChampion = async (data: IEditChampion) => {
  return await dndApi.put("player/champion/edit", data);
};

interface IEditAvatar {
  conversationId: string;
  avatarId: string;
}

const editAvatar = async (data: IEditAvatar) => {
  return await dndApi.put("player/avatar/edit", data);
};

interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  moveType: string;
  message?: string;
}

export interface IPlayMoveResponse {
  dice: number;
  diceAfterBonus: number;
  diceBreakdown: {
    aiDiceBonus: number;
    bonusApplied: number;
    dice: number;
    mana: number;
  };
}

const playMove = async (data: IPlayMove) => {
  return await dndApi.post<IPlayMoveResponse>("play", data);
};

const postLocations = async (data: { locations: Partial<ILocation>[] }) => {
  return await dndApi.post<ILocation[]>("locations", data);
};

export interface IPostDungeon {
  name: string;
  description: string;
  locations: string[];
  champions: string[];
  publiclySeen: boolean;
}

const getDungeon = async (dungeonId: string) => {
  return await dndApi.get<IDungeon>(`dungeon/${dungeonId}/`);
};

const getDungeons = async () => {
  return await dndApi.get<IDungeon[]>("dungeons");
};

const getRecommendedDungeons = async () => {
  return await dndApi.get<IDungeon[]>("dungeons/recommended");
};

const postDungeon = async (data: IPostDungeon) => {
  return await dndApi.post<IDungeon>("dungeon", data);
};

const getRooms = async () => {
  return await dndApi.get<{ rooms: IRoomData[] }>("rooms");
};

const postChampions = async (data: { champions: Partial<IChampion>[] }) => {
  return await dndApi.post<IChampion[]>("champions", data);
};

const postComplaint = async (data: { text: string }) => {
  return await dndApi.post("complaint", data);
};

const postQuestion = async (data: { question: string; conversationId: string }) => {
  return await dndApi.post("ask", data);
};

const dndService = {
  createRoom,
  joinRoom,
  getRoomData,
  getKingdom,
  createAvatar,
  startGame,
  editChampion,
  editAvatar,
  playMove,
  postLocations,
  postDungeon,
  getDungeon,
  getDungeons,
  getRecommendedDungeons,
  getRooms,
  postChampions,
  postComplaint,
  postQuestion,
};

export default dndService;
