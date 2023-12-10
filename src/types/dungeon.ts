import { z } from "zod";

import {
  baseDungeonSchema,
  championSchema,
  dungeonDetailSchema,
  dungeonForBackendSchema,
  dungeonResponseSchema,
  dungeonSchema,
  dungeonTxForBackendSchema,
  dungeonTxResponseSchema,
  locationSchema,
  moveMappingSchema,
  rateDungeonSchema,
} from "@/validations/dungeon";

export type ILocation = z.infer<typeof locationSchema>;

export type IChampion = z.infer<typeof championSchema>;

export type IBaseDungeon = z.infer<typeof baseDungeonSchema>;

export type IDungeon = z.infer<typeof dungeonSchema>;

export type IDungeonDetail = z.infer<typeof dungeonDetailSchema>;

export type IDungeonForBackend = z.infer<typeof dungeonForBackendSchema>;

export type IDungeonTxForBackend = z.infer<typeof dungeonTxForBackendSchema>;

export type IDungeonResponse = z.infer<typeof dungeonTxResponseSchema>;

export type IRateDungeon = z.infer<typeof rateDungeonSchema>;

export type IMoveMapping = z.infer<typeof moveMappingSchema>;
