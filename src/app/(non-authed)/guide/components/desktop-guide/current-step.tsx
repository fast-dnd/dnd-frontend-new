import Image from "next/image";
import { ArrowLeft, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { jibril } from "@/utils/fonts";

import { steps } from "../../utils/steps-info";

interface ICurrentStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}

const CurrentStep = ({ setCurrentStep, currentStep }: ICurrentStepProps) => {
  return (
    <>
      <div className="relative flex w-1/2 flex-col items-center justify-center gap-6">
        <button
          className="absolute left-10 top-14 flex items-center gap-2"
          onClick={() => setCurrentStep(-1)}
        >
          <ArrowLeft size={40} color="#ffffff50" className="mb-0.5" />
          <p className="text-xl text-white/50"> Back to menu</p>
        </button>

        <Image
          src={`/images/how-to-play/desktop/step-${currentStep + 1}.png`}
          alt={`step-${currentStep + 1}`}
          width={739 * 1.5}
          height={387 * 1.5}
        />
      </div>

      <div className="relative flex w-1/2 flex-col items-center justify-center gap-10">
        <motion.div
          className="flex items-center gap-4"
          key={currentStep}
          initial={{ x: currentStep % 2 === 0 ? -50 : 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: currentStep % 2 === 0 ? -50 : 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="size-2 rotate-45 bg-primary" />
          <p
            className="max-w-[470px] text-center text-[44px] uppercase tracking-[18.26px]"
            style={jibril.style}
          >
            {steps[currentStep].title}
          </p>

          <div className="-ml-3 size-2 rotate-45 bg-primary" />
        </motion.div>
        <motion.div
          className="w-[550px] text-xl font-light"
          key={currentStep + 10}
          initial={{ y: currentStep % 2 === 0 ? -50 : 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: currentStep % 2 === 0 ? -50 : 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {steps[currentStep].description}
        </motion.div>

        {currentStep !== 0 && (
          <button
            className="absolute bottom-10 left-10 flex items-center gap-2 text-xl font-medium capitalize"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            <CaretLeft size={30} className="mb-1" />
            PREV: {steps[currentStep - 1].title}
          </button>
        )}

        <div className="absolute bottom-10 right-10 text-xl font-medium capitalize">
          {currentStep === steps.length - 1 ? (
            <Button href="/home" className="px-8 py-4">
              Let&apos;s play
            </Button>
          ) : (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-2 capitalize"
            >
              NEXT: {steps[currentStep + 1].title}
              <CaretRight size={30} className="mb-1" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentStep;
