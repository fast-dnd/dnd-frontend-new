import { useState } from "react";
import { MdEdit } from "react-icons/md";

import StatusModal, { IStatusModalContent } from "@/components/status-modal";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import useCreateDungeon from "../hooks/use-create-dungeon";
import useUpdateDungeon from "../hooks/use-update-dungeon";
import { dungeonFormStore } from "../stores/dungeon-form-store";
import { steps } from "../utils/step-utils";
import { tagsRemoveLabel } from "../utils/tags-utils";

const StepsCard = ({ dungeonId }: { dungeonId: string | undefined }) => {
  const { currentStep, dungeonFormData } = dungeonFormStore.use();

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<IStatusModalContent>({
    actionText: "",
    title: "",
    description: "",
    href: "",
  });

  const { mutate: createDungeon, isLoading: isCreating } = useCreateDungeon();
  const { mutate: updateDungeon, isLoading: isUpdating } = useUpdateDungeon();

  const onFinishForm = () => {
    const dungeonFormDataWithoutTags = {
      ...dungeonFormData,
      tags: tagsRemoveLabel(dungeonFormData.tags),
    };

    if (dungeonId) {
      updateDungeon(dungeonFormDataWithoutTags, {
        onSuccess: (_data) => {
          setModalContent({
            title: "ADVENTURE EDITED SUCCESSFULLY",
            description: "You can start your story with your new adventure now!",
            actionText: "GO TO PROFILE",
            href: "/profile",
          });
          setOpenModal(true);
        },
        onError: () => {
          setModalContent({
            title: "ERROR EDITING ADVENTURE",
            description: "",
            actionText: "GO TO PROFILE",
            href: "/profile",
          });
          setOpenModal(true);
        },
      });
    } else {
      createDungeon(dungeonFormDataWithoutTags, {
        onSuccess: (data) => {
          dungeonFormStore.dungeonFormData.set((prev) => ({ ...prev, _id: data.data._id }));
          setModalContent({
            title: "ADVENTURE CREATED SUCCESSFULLY",
            description: "You can start your story with your new adventure now!",
            actionText: "GO TO PROFILE",
            href: "/profile",
          });
          setOpenModal(true);
        },
        onError: () => {
          setModalContent({
            title: "ERROR CREATING ADVENTURE",
            description: "",
            actionText: "GO TO PROFILE",
            href: "/profile",
          });
          setOpenModal(true);
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
            onClick={() => dungeonFormStore.currentStep.set(step)}
          >
            {step}
            <MdEdit />
          </div>
        ))}
      </div>
      <Button className="w-fit" onClick={onFinishForm} isLoading={isCreating || isUpdating}>
        {dungeonId ? "SAVE CHANGES" : "PUBLISH"}
      </Button>
      <StatusModal open={openModal} content={modalContent} />
    </Box>
  );
};

export default StepsCard;
