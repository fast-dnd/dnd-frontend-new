/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";

import GoldCoinIcon from "@/components/icons/gold-coin-icon";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/helpers/use-auth";
import aiBoxService from "@/services/aibox-service";
import { jibril } from "@/utils/fonts";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

type OraAiBoxViewPromptModalProps = {
  username: string;
  userImageUrl: string;
  boxId?: string;
  userId: string;
};

const OraAiViewBoxPromptModal = ({
  username,
  userImageUrl,
  boxId,
  userId,
}: OraAiBoxViewPromptModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [question, setQuestion] = useState("");
  const { loggedIn } = useAuth();

  const handleViewPromptClick = async () => {
    setIsProcessing(true);
    try {
      const response = await aiBoxService.getAiBoxPrompt({ boxId, userId });
      if (response.prompt && response.question) {
        setPrompt(response.prompt);
        setQuestion(response.question);
      } else {
        toast.error(`Failed to retrieve the prompt`);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      toast.error(`Error occurred while retrieving the prompt`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {loggedIn ? (
          <div className="text-xs text-gray-500 sm:text-base">
            <p>rated by v3</p>
            <p className="cursor-pointer text-blue-500 underline">(view prompt)</p>
          </div>
        ) : (
          <div className="text-xs text-gray-500 sm:text-base">
            <p>rated by v3</p>
            <p className="cursor-not-allowed text-gray-400">(login to view)</p>
          </div>
        )}
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
              <div className="size-2 shrink-0 rotate-45 bg-red-500" />
              <p
                className="mt-1 text-lg uppercase tracking-widest text-red-400 lg:text-2xl lg:tracking-[6.4px]"
                style={jibril.style}
              >
                Curious to See?
              </p>
              <div className="size-2 shrink-0 rotate-45 bg-red-500" />
            </div>
            {prompt ? (
              <div className="mt-4 w-full rounded bg-dark-800 p-6 text-white shadow-lg">
                <p className="text-xl font-bold">✨ Question:</p>
                <p className="text-lg">{question}</p>
                <p className="mt-4 text-xl font-bold">📝 Prompt:</p>
                <p className="text-lg">{prompt}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-white">
                <img
                  src={userImageUrl || "/images/default-avatar.png"}
                  alt={username}
                  className="h-12 w-12 rounded-full border-2 border-red-500 shadow-lg"
                />
                <p className="text-lg font-light tracking-wide lg:text-xl">
                  Wonder what {username} wrote? Discover their secret message!
                  <br />
                  <strong>Just 2 v3coins!</strong> Proceed to unlock.
                </p>
                <Button
                  onClick={handleViewPromptClick}
                  className="mt-6 flex transform items-center gap-2 rounded-full bg-red-400 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-500"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      View Prompt
                      <span className="inline-flex items-center">
                        (2 <GoldCoinIcon className="m-0 size-5 p-0" />)
                      </span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default OraAiViewBoxPromptModal;
