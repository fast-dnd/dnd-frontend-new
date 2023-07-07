import { BsFillLightningFill } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";
import { BiCoffee } from "react-icons/bi";

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
    icon: BsFillLightningFill,
  },
  {
    label: "Standard",
    value: "default-standard",
    icon: LuSwords,
  },
  {
    label: "Long",
    value: "default-long",
    icon: BiCoffee,
  },
] as const;

export type DungeonDuration = (typeof dungeonDuration)[number]["value"];
