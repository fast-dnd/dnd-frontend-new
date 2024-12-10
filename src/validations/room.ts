import { z } from "zod";

import { dungeonDurationsArray } from "@/utils/dungeon/dungeon-options";

import { championSchema } from "./dungeon";

export const gameStateSchema = z.enum(["CREATING", "GAMING", "WIN", "LOSE"]);

export const aiModelSchema = z.enum([
  "bartender_bob",
  "wizard_uncle_bob",
  "lama_farmer_bob",
  "philosopher_bob",
  "hacker_bob",
  "zookeeper_bob",
  "safari_guide_bob",
  "adventurer_bob",
  "artist_bob",
  "stoned_bob",
  "pepe_bob",
  "retardio_bob",
]);

export const gameModeSchema = z.enum([
  "normal",
  "only_emoji",
  "overly_descriptive",
  "vagueness",
  "three_languages",
  "random_words",
  "smart",
  "aggressive",
  "rap_battle",
  "stupid",
  "emotional",
  "sarcastic",
  "mysterious",
  "heroic",
  "lazy",
  "flashy",
]);

export const wordsChallengeSchema = z.array(
  z.object({
    accountId: z.string(),
    words: z.array(z.string()),
  }),
);

export const affectedPlayerSchema = z.object({
  name: z.string(),
  accountId: z.string(),
  health: z.number(),
  bonus: z.number(),
});

export const moveSchema = z.object({
  playerAccountId: z.string(),
  playerName: z.string(),
  playerChampion: z.string().nullish(),
  action: z.string(),
  dice: z.number(),
  mana: z.number(),
  aiRating: z.number(),
  aiDescription: z.string().nullable(),
  affectsOthers: z.array(affectedPlayerSchema).nullable(),
});

export const questionSchema = z.object({
  question: z.string(),
  bob3Answer: z.string(),
  playerAccountId: z.string(),
  playerName: z.string(),
  playerChampion: z.string().nullish(),
});

export const playerSchema = z.object({
  accountId: z.string(),
  imageUrl: z.string(),
  champion: championSchema.nullish(),
  bonusForNextRound: z.number(),
  gameMode: gameModeSchema.nullish(),
  name: z.string(),
  accountLevel: z.number(),
  health: z.number(),
  mana: z.number(),
  gold: z.number(),
});

export const roomSummarySchema = z.object({
  conversationId: z.string(),
  link: z.string(),
  player: playerSchema.optional(),
  admin: playerSchema.optional(),
});

export const baseRoomSchema = z.object({
  aiModel: aiModelSchema,
  state: gameStateSchema,
  roundEndsAt: z.string().nullish(),
  generateImages: z.boolean(),
  generateAudio: z.boolean(),
  responseDetailsDepth: z.enum(dungeonDurationsArray),
  price: z.number(),
  location: z.object({
    mission: z.string(),
  }),
});

export const roomDetailSchema = baseRoomSchema.extend({
  moves: z.array(z.array(moveSchema)).optional(),
  questions3History: z.array(questionSchema.partial()),
  playerState: z.array(playerSchema),
  link: z.string(),
  queuedMoves: z.array(moveSchema),
  currentRound: z.number(),
  asciiMovie: z.array(z.string()),
  chatGptResponses: z.array(z.string()),
  generatedImages: z.array(z.string().nullable()),
  generatedAudio: z.array(z.string()),
  dungeonId: z.string(),
  maxPlayers: z.number(),
  maxRounds: z.number(),
  wordsChallenge: wordsChallengeSchema.nullish(),
});

export const roomSchema = baseRoomSchema.extend({
  dungeon: z.object({
    id: z.string(),
    name: z.string(),
    imageUrl: z.string(),
  }),
  turn: z.number(),
  conversationId: z.string(),
  aiJudgeQuery: z.string().optional(),
  aiJudgeQueryNormalized: z.string().optional(),
  aiJudgeProcessedQuery: z.boolean().optional(),
  aiJudgeQueryTxHash: z.string().optional(),
  aiJudgeCommunitId: z.string().optional(),
});

export const roomHistorySchema = z.object({
  rooms: z.array(roomSchema),
  total: z.number(),
});

export const getStartGameTxSchema = z.object({
  transaction: z.string(),
});
