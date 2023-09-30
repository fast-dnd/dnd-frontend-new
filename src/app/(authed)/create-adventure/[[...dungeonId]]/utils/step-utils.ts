export const steps = ["General information", "Locations", "Champions"] as const;

export type Step = (typeof steps)[number];

export type StatusType = "LIST" | "CREATING" | "EDITING";
