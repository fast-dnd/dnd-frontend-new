export const steps = ["General information", "Scenes", "Characters"] as const;

export const stepDescriptions = {
  "General information": null,
  Scenes: "add 3-5 Scenes",
  Characters: "add at least 1 CHARACTER",
} as const;

export type Step = (typeof steps)[number];

export type StatusType = "LIST" | "CREATING" | "EDITING";
