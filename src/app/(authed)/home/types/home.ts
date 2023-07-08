export const homeTabs = ["PLAY", "MY KINGDOM", "SETTINGS", "HOW TO PLAY"] as const;

export type HomeTabType = (typeof homeTabs)[number];

export const dungeonTabs = ["TOP DUNGEONS", "MY DUNGEONS", "FAVORITE DUNGEONS"] as const;

export type DungeonTabType = (typeof dungeonTabs)[number];
