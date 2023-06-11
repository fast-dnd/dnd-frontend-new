import { ILocation, IPlayer, IRoom } from "@/types/dnd";
import createApi from "./api-factory";

const roomApi = createApi({ commonPrefix: "rooms/" });

const createRoom = async (data: {
  generateImages: boolean;
  generateAudio: boolean;
  templateSentences?: string;
  dungeon?: string;
}) => {
  return await roomApi.post<IRoom>("", data);
};

const joinRoom = async (data: { link: string }) => {
  return await roomApi.post<IRoom>("join", data);
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
  return await roomApi.get<IRoomData>(conversationId);
};

const getRooms = async () => {
  return await roomApi.get<{ rooms: IRoomData[] }>("").then((res) => res.data);
};

const startGame = async (data: { conversationId: string }) => {
  return await roomApi.post("room/start", data);
};

const roomService = {
  createRoom,
  joinRoom,
  getRoomData,
  getRooms,
  startGame,
};

export default roomService;
