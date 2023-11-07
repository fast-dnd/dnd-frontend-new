export const tabs = ["ADVENTURES", "CAMPAIGNS", "GAME HISTORY", "REWARDS"] as const;
export type Tab = (typeof tabs)[number];
