export const ChampionClasses = ["mage", "warrior", "explorer"] as const;
export type ChampionClass = (typeof ChampionClasses)[number];

export const defaultMoves = [
  "discover_health",
  "discover_mana",
  "conversation_with_team",
  "rest",
] as const;
export type DefaultMove = (typeof defaultMoves)[number];

export type MoveType = "free_will" | DefaultMove;

export type LocationPhase = "discovery" | "end";

export interface IChampion {
  _id: string;
  name: string;
  description: string;
  label: string;
  moveMapping: { [key in DefaultMove]: string };
}

export interface IPlayer {
  name: string;
  accountId: string;
  avatarId: string;
  champion: IChampion;
  health: number;
  mana: number;
  gold: number;
  bonusForNextRound: number;
  played?: boolean;
}

export interface IRoom {
  conversationId: string;
  link: string;
  player?: IPlayer;
  admin?: IPlayer;
}

export interface ILocation {
  _id: string;
  name: string;
  description: string;
  mission: string;
  transition: string;
  phase: LocationPhase;
  allPlayersRollSum: number;
  neededRollSumPercent: number;
  missionCompleted: boolean;
}

export interface IDungeon {
  _id: string;
  name: string;
  description: string;
  locations: ILocation[];
  champions: IChampion[];
  imageUrl?: string;
  recommended: boolean;
  publiclySeen: boolean;
}
