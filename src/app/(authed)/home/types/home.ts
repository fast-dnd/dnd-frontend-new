export const homeTabs = ["PLAY", "MY KINGDOM", "SETTINGS", "HOW TO PLAY"] as const;

export type HomeTabType = (typeof homeTabs)[number];

export const dungeonTabs = ["top dungeons", "my dungeons", "favorite dungeons"] as const;

export type DungeonTabType = (typeof dungeonTabs)[number];
