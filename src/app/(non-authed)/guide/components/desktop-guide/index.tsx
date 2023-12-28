"use client";

import { useState } from "react";

import CurrentStep from "./current-step";
import Intro from "./intro";

const DesktopGuide = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);

  return (
    <div className="mb-20 hidden min-h-0 flex-1 rounded-xl bg-black lg:flex">
      {currentStep !== -1 ? (
        <CurrentStep setCurrentStep={setCurrentStep} currentStep={currentStep} />
      ) : (
        <Intro setCurrentStep={setCurrentStep} />
      )}
    </div>
  );
};

export default DesktopGuide;
