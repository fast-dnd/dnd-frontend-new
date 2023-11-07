export const baseTabs = ["MY PROFILE", "MY COLLECTIONS"] as const;
export type BaseTab = (typeof baseTabs)[number];
