import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "usehooks-ts";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/utils/style-utils";

import { gameStore } from "../../stores/game-store";
import { moveStore } from "../../stores/move-store";
import DiceBreakdown from "../gameplay/dice-breakdown";
import Die from "../gameplay/die";

const DiceModal = () => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");
  const [open, setOpen] = useState(false);

  const dice = moveStore.dice.use();
  const buttonState = moveStore.buttonState.use();
  const roll = moveStore.roll.use();
  const aiDescription = moveStore.aiDescription.use();

  const pageState = gameStore.pageState.use();

  useEffect(() => {
    if (buttonState === "ROLLING") setOpen(true);
  }, [buttonState]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open && isMobileTablet && pageState === "DEFAULT"}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent
        fromBottom
        className="left-0 top-0 flex h-full w-full max-w-full translate-x-0 translate-y-0 flex-col items-center justify-center gap-4 bg-black/50 px-4 py-3 data-[state=closed]:duration-300 data-[state=open]:duration-300"
        onClick={buttonState !== "ROLLING" ? onClose : undefined}
      >
        <AiOutlineClose
          className={cn("absolute right-3 top-4", buttonState === "ROLLING" && "hidden")}
          onClick={onClose}
        />
        <div
          className={cn(
            "flex text-[32px] font-bold leading-[48px]",
            buttonState !== "ROLLING" && "hidden",
          )}
        >
          ROLLING...
        </div>

        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="flex gap-12"
        >
          {dice.map((roll, i) => (
            <Die big key={i} roll={roll} />
          ))}
        </motion.div>

        <div
          className={cn(
            "flex w-full flex-col items-center gap-5 opacity-100 transition-all duration-500",
            buttonState === "ROLLING" && "h-0 opacity-0",
          )}
        >
          <div className="flex w-40 flex-col items-center gap-2">
            <p className="text-[32px] font-bold leading-[48px]">Total: {roll?.diceAfterBonus}</p>
            <DiceBreakdown />
          </div>
          <p className="w-full text-sm leading-snug">{aiDescription}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DiceModal;
