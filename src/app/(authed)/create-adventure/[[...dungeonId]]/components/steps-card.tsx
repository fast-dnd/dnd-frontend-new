import { useState } from "react";
import { AxiosError } from "axios";
import { MdEdit } from "react-icons/md";
import { z } from "zod";

import StatusModal, { StatusModalContent } from "@/components/status-modal";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { IDungeonForBackend } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

import useCreateDungeon from "../hooks/use-create-dungeon";
import useUpdateDungeon from "../hooks/use-update-dungeon";
import { dungeonFormStore } from "../stores/dungeon-form-store";
import { steps } from "../utils/step-utils";
import { tagsRemoveLabel } from "../utils/tags-utils";

const StepsCard = ({ dungeonId }: { dungeonId: string | undefined }) => {
  const { currentStep, dungeonFormData } = dungeonFormStore.use();

  const [modalContent, setModalContent] = useState<StatusModalContent>();

  const { mutate: createDungeon, isLoading: isCreating } = useCreateDungeon();
  const { mutate: updateDungeon, isLoading: isUpdating } = useUpdateDungeon();

  const onFinishForm = () => {
    const dungeonFormDataWithoutTags: IDungeonForBackend = {
      ...dungeonFormData,
      background: dungeonFormData.background?._id || null,
      tags: tagsRemoveLabel(dungeonFormData.tags),
    };

    if (dungeonId) {
      updateDungeon(dungeonFormDataWithoutTags, {
        onSuccess: ({ id }) => {
          setModalContent({ state: "EDITED", id });
        },
        onError: (data) => {
          if (data instanceof AxiosError) {
            const errorMessages = z.array(z.string()).parse(data?.response?.data);
            setModalContent({ errorMessages, state: "ERRORED" });
          }
        },
      });
    } else {
      createDungeon(dungeonFormDataWithoutTags, {
        onSuccess: ({ id }) => {
          dungeonFormStore.dungeonFormData.set((prev) => ({ ...prev, id }));
          setModalContent({ state: "CREATED", id });
        },
        onError: (data) => {
          if (data instanceof AxiosError) {
            const errorMessages = z.array(z.string()).parse(data?.response?.data);
            setModalContent({ errorMessages, state: "ERRORED" });
          }
        },
      });
    }
  };

  return (
    <Box
      titleClassName="hidden"
      title=""
      wrapperClassName="basis-1/3"
      className="flex h-full w-full flex-col items-center justify-between rounded-t-md p-8"
    >
      <div className="flex w-full flex-col justify-between gap-6">
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-md px-6 py-4 text-xl transition-all duration-200 hover:bg-white/5",
              currentStep === step && "bg-white/5",
            )}
            onClick={() => {
              dungeonFormStore.status.set("LIST");
              dungeonFormStore.currentStep.set(step);
            }}
          >
            {step}
            <MdEdit />
          </div>
        ))}
      </div>
      <Button className="w-fit" onClick={onFinishForm} isLoading={isCreating || isUpdating}>
        {dungeonId ? "SAVE CHANGES" : "PUBLISH"}
      </Button>
      <StatusModal
        type="ADVENTURE"
        open={!!modalContent}
        content={modalContent}
        onClose={() => setModalContent(undefined)}
      />
    </Box>
  );
};

export default StepsCard;
