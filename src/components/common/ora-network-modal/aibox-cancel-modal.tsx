/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import aiBoxService from "@/services/aibox-service";
import { jibril } from "@/utils/fonts";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

type OraAiBoxCancelPromptModalProps = {
  aiBoxId: string;
};

const OraAiCancelBoxPromptModal = ({ aiBoxId }: OraAiBoxCancelPromptModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCancelClick = async (aiBoxId: string) => {
    setIsProcessing(true);
    try {
      const response = await aiBoxService.submitPrompt(aiBoxId, "", "cancel");
      if (response.prompt == "") {
        window.location.reload();
      } else {
        toast.error(`Cancellation failed`);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      toast.error(`Error occurred during cancellation`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Tooltip content="Cancel transaction if you have been waiting for more than 5m">
            <Button
              type="submit"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <IoMdClose /> {/* Reduced icon size */}
            </Button>
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent className="z-[100] flex flex-col gap-12 bg-black p-4 max-lg:size-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:p-8">
        <div className="flex justify-end lg:hidden">
          <DialogClose>
            <AiOutlineClose />
          </DialogClose>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-lg uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              Cancel Ai Box transaction
            </p>
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
          </div>
          <br />
          <p className="ml-2 text-center font-light lg:text-xl lg:tracking-[1.5px]">
            Since we are in beta, sometimes it can happen that a transaction does not get processed
            after 5 minutes. You can either contact our support team or cancel the transaction and
            try again. Please note that this is only going to be possible while we are in beta
            phase.
          </p>
          <br />
          <Button
            onClick={() => handleCancelClick(aiBoxId)}
            className="hover:bg-primary-dark bg-primary"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Cancel transaction"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OraAiCancelBoxPromptModal;
