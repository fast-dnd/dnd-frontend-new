export const steps = ["General information", "Locations", "Champions"] as const;

export const stepDescriptions = {
  "General information": null,
  Locations: "add 3-4 Scenes",
  Champions: "add 2-4 CHARACTERS",
} as const;

export type Step = (typeof steps)[number];

export type StatusType = "LIST" | "CREATING" | "EDITING";
