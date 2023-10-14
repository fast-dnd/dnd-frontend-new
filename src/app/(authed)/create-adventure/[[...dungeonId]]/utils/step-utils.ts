export const steps = ["General information", "Scenes", "Characters"] as const;

export const stepDescriptions = {
  "General information": null,
  Scenes: "add 3-4 Scenes",
  Characters: "add 2-4 CHARACTERS",
} as const;

export type Step = (typeof steps)[number];

export type StatusType = "LIST" | "CREATING" | "EDITING";
