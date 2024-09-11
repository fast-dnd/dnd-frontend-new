import { useState } from "react";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";

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
  aiModelSelected: boolean;
  setAiModelSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setAiModel: React.Dispatch<React.SetStateAction<IAiModel | undefined>>;
}

const ChooseAiModel = ({
  selectedChampion,
  isAdmin,
  roomData,
  aiModelSelected,
  setAiModelSelected,
  setAiModel,
}: IAiModelProps) => {
  if (!roomData) return <>Something went wrong...</>;
  return (
    <>
      {isAdmin && selectedChampion && !aiModelSelected && (
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-between gap-4 overflow-hidden p-4 text-sm",
            !selectedChampion && "hidden",
            (!isAdmin || aiModelSelected) && "hidden",
          )}
        >
          <div className="flex flex-col items-center gap-4">
            <p className="uppercase">AI MODEL</p>
            <ChooseAiModelModal roomData={roomData} setAiModel={setAiModel} />
          </div>
          <div className="flex w-full justify-center">
            <Button className="w-full" onClick={() => setAiModelSelected(true)}>
              PLAY
            </Button>
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
        <div className="h-full w-[calc(100vw_-_3.25rem)] px-1.5">
          <div className="flex h-full flex-col justify-between rounded-md bg-black/80">
            <div className="flex flex-col items-center p-4">
              <p className="text-center text-3xl font-bold">{selectedAiModel?.name}</p>

              <div className="mt-2 flex items-start py-5">
                <p className="line-clamp-5 font-light">{selectedAiModel?.longDescription}</p>
              </div>

              {/* Image in the center */}
              <div className="mt-6 flex justify-center">
                <Image
                  src={selectedAiModel.imgUrl || "/images/default-avatar.png"}
                  alt={selectedAiModel.name}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            </div>
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
