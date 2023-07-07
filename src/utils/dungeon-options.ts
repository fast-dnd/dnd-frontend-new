export const dungeonTags = [
  "love",
  "mystery",
  "adventure",
  "fantasy",
  "si-fi",
  "historical",
  "horror",
  "drama",
  "comedy",
  "dystopian",
  "crime",
  "mythology",
  "war",
  "nature",
  "art",
  "mind",
  "exploration",
  "survival",
  "magic",
  "magic",
  "time-travel",
  "emotional",
  "humor",
  "post_apocalyptic",
  "detective",
  "conflict",
  "revenge",
  "creativity",
  "absurdity",
  "other",
] as const;

export type DungeonTag = (typeof dungeonTags)[number];

export const dungeonDuration = [
  {
    label: "Blitz",
    value: "default-blitz",
  },
  {
    label: "Standard",
    value: "default-standard",
  },
  {
    label: "Long",
    value: "default-long",
  },
] as const;

export type DungeonDuration = (typeof dungeonDuration)[number]["value"];
