import { observable } from "@legendapp/state";

export const tabs = ["ADVENTURES", "CAMPAIGNS", "GAME HISTORY", "REWARDS"] as const;
export type Tab = (typeof tabs)[number];

export const tabsStore = observable<Tab>(tabs[0]);
