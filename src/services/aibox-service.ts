import queryString from "query-string";

import {
  aiBoxPromptSchema,
  aiBoxSchema,
  aiBoxViewPromptSchema,
  aiShortBoxesSchema,
} from "@/validations/aibox";
import { leaderboardSchema } from "@/validations/leaderboard";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const aiBoxApi = createApi({ commonPrefix: "ai-box" });

interface IGetLeaderboardProps {
  epoch: number;
  boxId?: string;
  pageParam: number;
}

const getAiBoxLeaderboard = async ({ epoch, boxId, pageParam }: IGetLeaderboardProps) => {
  const skip = (pageParam - 1) * PAGINATION_LIMIT;
  const limit = skip >= 0 ? PAGINATION_LIMIT : Math.max(PAGINATION_LIMIT + skip, 0);
  const queryParams = queryString.stringify({
    skip: Math.max(0, skip),
    limit: limit,
    boxId: boxId,
  });

  return await aiBoxApi
    .get(`/leaderboard/${epoch}?` + queryParams)
    .then((res) => leaderboardSchema.parse(res.data));
};

const getAiBox = async ({ boxId }: { boxId?: string }) => {
  if (!boxId) {
    return await aiBoxApi.get("single").then((res) => aiBoxSchema.parse(res.data));
  } else {
    const queryParams = queryString.stringify({
      boxId: boxId,
    });
    return await aiBoxApi.get("single?" + queryParams).then((res) => aiBoxSchema.parse(res.data));
  }
};

const getAiBoxes = async ({ pageParam }: { pageParam: number }) => {
  const queryParams = queryString.stringify({
    skip: (pageParam - 1) * PAGINATION_LIMIT,
    limit: PAGINATION_LIMIT,
  });

  return await aiBoxApi.get("?" + queryParams).then((res) => aiShortBoxesSchema.parse(res.data));
};

const getAiBoxPrompt = async ({ boxId, userId }: { boxId?: string; userId: string }) => {
  const queryParams = queryString.stringify({
    boxId: boxId,
    userId: userId,
  });
  return await aiBoxApi
    .get("prompt?" + queryParams)
    .then((res) => aiBoxViewPromptSchema.parse(res.data));
};

const submitPrompt = async (aiBoxId: string, prompt: string, method: string) => {
  return await aiBoxApi
    .post(`/prompt/${aiBoxId}`, { prompt, method })
    .then((res) => aiBoxPromptSchema.parse(res.data));
};

interface CreateAiBoxParams {
  name: string;
  duration: number;
  verifiable: boolean;
  questions: string[];
}

export const createAiBox = async ({ name, duration, verifiable, questions }: CreateAiBoxParams) => {
  try {
    const response = await aiBoxApi.post("/create", { name, duration, verifiable, questions });
    return response.data;
  } catch (error) {
    console.error("Error creating AI Box:", error);
    throw error;
  }
};

const aiBoxService = {
  getAiBoxLeaderboard,
  getAiBoxes,
  getAiBoxPrompt,
  getAiBox,
  submitPrompt,
  createAiBox,
};

export default aiBoxService;

export const aiBoxKey = "aiBox";
