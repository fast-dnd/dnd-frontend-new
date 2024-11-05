/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

import GoldCoinIcon from "@/components/icons/gold-coin-icon";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import useAuth from "@/hooks/helpers/use-auth";
import aiBoxService from "@/services/aibox-service";
import { jibril } from "@/utils/fonts";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

type OraAiBoxCancelPromptModalProps = {
  aiBoxId: string;
};

const AiboxCancelCasualBoxModal = ({ aiBoxId }: OraAiBoxCancelPromptModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { loggedIn } = useAuth();

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
          <Tooltip
            content={loggedIn ? "Cancel this response, try again" : "Login to be able to try again"}
          >
            <Button
              type="submit"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              disabled={!loggedIn}
            >
              <IoMdClose /> {/* Reduced icon size */}
            </Button>
          </Tooltip>
        </div>
      </DialogTrigger>
      {loggedIn && (
        <DialogContent className="z-[100] flex w-full max-w-md flex-col gap-6 rounded-lg bg-gradient-to-r from-dark-900 to-black p-6 lg:max-w-lg lg:p-10">
          <div className="flex justify-end lg:hidden">
            <DialogClose>
              <AiOutlineClose />
            </DialogClose>
          </div>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-4">
              <div className="size-2 shrink-0 rotate-45 bg-primary" />
              <p
                className="mt-1 text-lg uppercase tracking-widest text-primary lg:text-2xl lg:tracking-[6.4px]"
                style={jibril.style}
              >
                Cancel Casual AI Box Transaction
              </p>
              <div className="size-2 shrink-0 rotate-45 bg-primary" />
            </div>
            <p className="text-lg font-light tracking-wide text-white lg:text-xl">
              😏 Decided to bail on this rating? No worries! <br />
              If you want to give it another go, it’ll only cost you <strong>5 v3coins 💸</strong>!
            </p>
            <Button
              onClick={() => handleCancelClick(aiBoxId)}
              className="hover:bg-primary-dark mt-6 flex transform items-center gap-2 rounded-full bg-primary px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105"
              disabled={isProcessing}
            >
              {isProcessing ? (
                "Processing... 🔄"
              ) : (
                <>
                  Proceed with canceling
                  <span className="inline-flex items-center">
                    (5 <GoldCoinIcon className="m-0 size-5 p-0" />)
                  </span>
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AiboxCancelCasualBoxModal;
