import { BsFillLightningFill } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";
import { BiCoffee } from "react-icons/bi";

export const dungeonTags = [
  "❤️ love",
  "🔍 mystery",
  "🌍 adventure",
  "🧙‍♂️ fantasy",
  "🚀 sci-fi",
  "📜 historical",
  "👻 horror",
  "🎭 drama",
  "😂 comedy",
  "🏙️ dystopian",
  "🔫 crime",
  "🏛️ mythology",
  "⚔️ war",
  "🌿 nature",
  "🎨 art",
  "🧠 mind",
  "🗺️ exploration",
  "🔪 survival",
  "🔮 magic",
  "🤖 futuristic",
  "⏳ time-travel",
  "😢 emotional",
  "😄 humor",
  "🌆 post_apocalyptic",
  "🕵️ detective",
  "⚔️ conflict",
  "🔪 revenge",
  "🎨 creativity",
  "🤪 absurdity",
  "🔹 other",
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
