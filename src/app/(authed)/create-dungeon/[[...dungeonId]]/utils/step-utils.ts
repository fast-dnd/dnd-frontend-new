export const steps = ["INITIAL", "LOCATIONS", "CHAMPIONS", "FINAL"] as const;

export type Step = (typeof steps)[number];

export type StatusType = "LIST" | "CREATING" | "EDITING";

export const stepTitles = {
  INITIAL: "Describe your dungeon",
  LOCATIONS: "Set up the scenarios",
  CHAMPIONS: "Define the roles",
  FINAL: "Dungeon Created",
} as const;

export const numberToStepArr = ["INITIAL", "LOCATIONS", "CHAMPIONS", "FINAL"] as Step[];

export const getPreviousStep = (currentStep: Step) => {
  const currentIndex = numberToStepArr.indexOf(currentStep);
  return numberToStepArr[currentIndex - 1];
};

export const getNextStep = (currentStep: Step) => {
  const currentIndex = numberToStepArr.indexOf(currentStep);
  return numberToStepArr[currentIndex + 1];
};
