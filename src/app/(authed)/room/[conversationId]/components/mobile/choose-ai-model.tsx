import { useState } from "react";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IChampion } from "@/types/dungeon";
import { IAiModel, IRoomDetail } from "@/types/room";
import { aiModels } from "@/utils/ai-models";
import { cn } from "@/utils/style-utils";

interface IAiModelProps {
  selectedChampion: IChampion | null | undefined;
  isAdmin: boolean;
  roomData: IRoomDetail | undefined;
  gameModeSelected: boolean;
  aiModelSelected: boolean;
  setAiModelSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setAiModel: React.Dispatch<React.SetStateAction<IAiModel | undefined>>;
}

const ChooseAiModel = ({
  selectedChampion,
  isAdmin,
  roomData,
  gameModeSelected,
  aiModelSelected,
  setAiModelSelected,
  setAiModel,
}: IAiModelProps) => {
  if (!roomData) return <>Something went wrong...</>;
  return (
    <>
      {isAdmin && selectedChampion && gameModeSelected && !aiModelSelected && (
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-between gap-4 overflow-hidden p-4 text-sm",
            (!selectedChampion || !gameModeSelected) && "hidden",
            (!isAdmin || aiModelSelected) && "hidden",
          )}
        >
          <div className="flex flex-col gap-4">
            <p className="uppercase">Ai model</p>
            <ChooseAiModelModal roomData={roomData} setAiModel={setAiModel} />
          </div>
          <div className="flex justify-center">
            <Button onClick={() => setAiModelSelected(true)}>PLAY</Button>
          </div>
        </div>
      )}
    </>
  );
};

const ChooseAiModelModal = ({
  roomData,
  setAiModel,
}: {
  roomData: IRoomDetail;
  setAiModel: React.Dispatch<React.SetStateAction<IAiModel | undefined>>;
}) => {
  const [open, setOpen] = useState(false);

  const selectedAiModel = aiModels.find((aiModel) => aiModel.aiModel === roomData.aiModel)!;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex items-center gap-3 rounded-md bg-black p-3">
          <Image
            src={selectedAiModel.imgUrl}
            alt={selectedAiModel.aiModel}
            width={80}
            height={80}
            className="size-20 rounded-md"
          />
          <div className="flex flex-col gap-1 text-start">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold tracking-tighter">{selectedAiModel.name}</p>
              <FiChevronDown size={20} />
            </div>
            <p className="text-sm font-light opacity-80">{selectedAiModel.longDescription}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        fromBottom
        className="pointer-events-auto bottom-0 left-0 top-auto flex h-fit w-full max-w-full translate-x-0 translate-y-0 flex-col bg-black/80 p-0 pb-4 focus:border-0 focus:ring-0"
      >
        <div className="flex h-14 w-full items-start justify-between bg-gradient-to-b from-black to-transparent p-4">
          <span className="text-xs font-medium uppercase">Select ai model</span>
          <DialogClose>
            <AiOutlineClose className="size-4" />
          </DialogClose>
        </div>
        <div className="flex w-full flex-col gap-4 p-4 pt-0">
          {aiModels.map((aiModel) => (
            <div
              key={aiModel.name}
              className="flex items-center gap-3 rounded-md bg-black"
              onClick={() => {
                setAiModel(aiModel.aiModel as IAiModel);
                setOpen(false);
              }}
            >
              <Image
                src={aiModel.imgUrl}
                alt={aiModel.aiModel}
                width={80}
                height={80}
                className="size-20 rounded-md"
              />
              <div className="flex flex-col gap-1 text-start">
                <p className="text-xl font-semibold tracking-tighter">{aiModel.name}</p>
                <p className="text-sm">{aiModel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseAiModel;
