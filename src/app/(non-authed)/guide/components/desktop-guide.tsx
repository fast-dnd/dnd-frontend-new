"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { jibril } from "@/utils/fonts";

import { steps } from "../utils/steps-info";

const DesktopGuide = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);

  return (
    <div className="mb-20 hidden min-h-0 flex-1 rounded-xl bg-black lg:flex">
      {currentStep !== -1 ? (
        <>
          <div className="relative flex w-1/2 flex-col items-center justify-center gap-6">
            <button
              className="absolute left-10 top-14 flex items-center gap-2"
              onClick={() => setCurrentStep(-1)}
            >
              <ArrowLeft size={40} color="#ffffff50" className="mb-0.5" />
              <p className="text-xl text-white/50"> Back to menu</p>
            </button>
            <motion.div
              key={currentStep}
              initial={{ scale: 0 }}
              animate={{ scale: "100%" }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.25 }}
            >
              <Image
                src={`/images/how-to-play/desktop/step-${currentStep + 1}.png`}
                alt="intro"
                width={739 * 1.5}
                height={387 * 1.5}
              />
            </motion.div>
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
              <div className="h-2 w-2 rotate-45 bg-primary" />
              <p
                className="max-w-[470px] text-center text-[44px] uppercase tracking-[18.26px]"
                style={jibril.style}
              >
                {steps[currentStep].title}
              </p>

              <div className="-ml-3 h-2 w-2 rotate-45 bg-primary" />
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

            <button
              className="absolute bottom-10 right-10 flex items-center gap-2 text-xl font-medium capitalize"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              {currentStep === steps.length - 1 ? (
                <Button href="/home" className="px-8 py-4">
                  Let&apos;s play
                </Button>
              ) : (
                <>
                  NEXT: {steps[currentStep + 1].title}
                  <CaretRight size={30} className="mb-1" />
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        <motion.div
          className="flex h-full w-full"
          initial={{ scale: 0 }}
          animate={{ scale: "100%" }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.25 }}
        >
          <div className="relative flex w-1/2 flex-col items-center justify-center gap-6">
            <Image
              src="/images/how-to-play/desktop/intro.png"
              alt="intro"
              width={2048}
              height={2048}
              className="absolute inset-0 z-0 h-full w-full rounded-xl object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-black/50" />
            <p className="z-20 text-[44px] font-semibold uppercase tracking-[4.4px]">
              HOW TO PLAY?
            </p>
            <p className="z-20 w-96 text-center text-xl">
              Learn all the tips and tricks of the V3RPG storytelling game.
            </p>
            <Button className="z-20 w-fit px-12 py-5" onClick={() => setCurrentStep(0)}>
              GET STARTED
            </Button>
          </div>

          <div className="flex w-1/2 flex-col justify-between p-20">
            {steps.map((step, index) => (
              <Button
                key={index}
                variant="google"
                className="w-full justify-start gap-4 p-8 lg:text-2xl lg:tracking-[10.673px]"
                style={jibril.style}
                onClick={() => setCurrentStep(index)}
              >
                <div className="h-2 w-2 rotate-45 bg-primary" />
                {step.title}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DesktopGuide;
