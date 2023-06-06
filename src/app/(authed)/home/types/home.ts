export const homeTabs = ["PLAY", "MY KINGDOM", "SETTINGS"] as const;

export type HomeTabType = (typeof homeTabs)[number];

export const dungeonTabs = ["MY DUNGEONS", "TOP DUNGEONS"] as const;

export type DungeonTabType = (typeof dungeonTabs)[number];
