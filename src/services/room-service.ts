import { ILocation, IPlayer, IRoom, MoveType } from "@/types/dnd";
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

//would work better if IQuestion and IMove had timestamps of some sort

export interface IQuestion {
  playerName: string;
  playerChampion: string;
  playerAccountId: string;
  question: string;
  bob3Answer?: string;
}

export interface IMove {
  playerAccountId: string;
  action: string;
  aiDescription: string;
  aiRating: number;
  dice: number;
  mana: number;
  moveType: MoveType;
  playerChampion: string;
  playerName: string;
}

export interface IRoomArrayElement {
  state: "CREATING" | "GAMING" | "CLOSED";
  turn: number;
  dungeon: {
    id: string;
    name: string;
    imageUrl: string;
  };
  avatar: {
    id: string;
    name: string;
    image: string;
  };
  conversationId: string;
  generateAudio: boolean;
  genrateImages: boolean;
}

export interface IRoomData {
  state: "CREATING" | "GAMING" | "CLOSED";
  moves: IMove[][];
  playerState: IPlayer[];
  roundEndsAt: string | null;
  dungeonId: string;
  link: string;
  queuedMoves: IMove[];
  currentRound: number;
  chatGptResponses: string[];
  generatedImages: string[];
  genrateImages: boolean;
  generatedAudio: string[];
  generateAudio: string;
  location: ILocation;
  adventureMission: string;
  conversationId: string;
  questions3History: IQuestion[];
}

const getRoomData = async (conversationId: string) => {
  return await roomApi.get<IRoomData>(`room/${conversationId}`).then((res) => res.data);
};

const getRooms = async () => {
  return await roomApi.get<{ rooms: IRoomArrayElement[] }>("rooms").then((res) => res.data);
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
