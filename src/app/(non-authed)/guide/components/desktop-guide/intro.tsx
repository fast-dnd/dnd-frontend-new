import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { jibril } from "@/utils/fonts";

import { steps } from "../../utils/steps-info";

interface IIntroProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Intro = ({ setCurrentStep }: IIntroProps) => {
  return (
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
        <p className="z-20 text-[44px] font-semibold uppercase tracking-[4.4px]">HOW TO PLAY?</p>
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
  );
};

export default Intro;
