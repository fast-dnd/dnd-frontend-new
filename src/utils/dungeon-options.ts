import { BiCoffee } from "react-icons/bi";
import { BsFillLightningFill } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";

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
    value: "blitz",
    icon: BsFillLightningFill,
  },
  {
    label: "Standard",
    value: "standard",
    icon: LuSwords,
  },
  {
    label: "Long",
    value: "long",
    icon: BiCoffee,
  },
] as const;

export type DungeonDuration = (typeof dungeonDuration)[number]["value"];
