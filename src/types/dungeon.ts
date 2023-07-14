import { DungeonDuration, DungeonTag } from "@/utils/dungeon-options";

import { DefaultMove } from "./game";

export interface IDungeonFormData {
  id?: string;
  name: string;
  maxPlayers: 3;
  recommendedResponseDetailsDepth: DungeonDuration;
  description: string;
  style: string;
  tags: { label: DungeonTag; value: DungeonTag }[];
  imageUrl?: string;
  image?: string;
  locations: ILocationFormData[];
  champions: IChampionFormData[];
}

export interface IDungeon {
  _id: string;
  name: string;
  recommendedResponseDetailsDepth: DungeonDuration;
  description: string;
  style: string;
  tags: DungeonTag[];
  locations: ILocation[];
  champions: IChampion[];
  imageUrl?: string;
  recommended: boolean;
  publiclySeen: boolean;
}

export interface ILocationFormData {
  id?: string;
  name: string;
  description: string;
  mission: string;
  transition: string;
}

export interface ILocation {
  _id: string;
  name: string;
  description: string;
  mission: string;
  transition: string;
  phase: "discovery" | "end";
  allPlayersRollSum: number;
  neededRollSumPercent: number;
  missionCompleted: boolean;
}

export interface IChampionFormData {
  id?: string;
  name: string;
  description: string;
  moveMapping: {
    discover_health: string;
    discover_mana: string;
    conversation_with_team: string;
    rest: string;
  };
}

export interface IChampion {
  _id: string;
  name: string;
  description: string;
  label: string;
  moveMapping: { [key in DefaultMove]: string };
}
