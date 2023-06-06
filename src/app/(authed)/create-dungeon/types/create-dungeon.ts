export const steps = ["INITIAL", "LOCATIONS", "CHAMPIONS", "FINAL"] as const;

export type Step = (typeof steps)[number];

export const stepTitles = [
  "Describe your dungeon",
  "Set up the scenarios",
  "Define the roles",
  "This is your dungeon ID",
] as const;
