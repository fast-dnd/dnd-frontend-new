import { ILocation, IPlayer, IRoom } from "@/types/dnd";
import createApi from "./api-factory";

const roomApi = createApi({});

const createRoom = async (data: {
  generateImages: boolean;
  generateAudio: boolean;
  templateSentences?: string;
  dungeon?: string;
}) => {
  return await roomApi.post<IRoom>("room", data);
};

const joinRoom = async (data: { link: string }) => {
  return await roomApi.post<IRoom>("room/join", data);
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

const getRoomData = async (conversationId: string) => {
  return await roomApi.get<IRoomData>(`room/${conversationId}`).then((res) => res.data);
};

const getRooms = async () => {
  return await roomApi.get<{ rooms: IRoomData[] }>("rooms").then((res) => res.data);
};

const startGame = async (data: { conversationId: string }) => {
  return await roomApi.post("room/start", data);
};

interface IEditChampion {
  conversationId: string;
  championId: string;
}

const editChampion = async (data: IEditChampion) => {
  return await roomApi.put("player/champion/edit", data);
};

interface IEditAvatar {
  conversationId: string;
  avatarId: string;
}

const editAvatar = async (data: IEditAvatar) => {
  return await roomApi.put("player/avatar/edit", data);
};

const roomService = {
  createRoom,
  joinRoom,
  getRoomData,
  getRooms,
  startGame,
  editChampion,
  editAvatar,
};

export default roomService;
