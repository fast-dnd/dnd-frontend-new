import { useState } from "react";
import Image from "next/image";
import { AxiosError } from "axios";
import { z } from "zod";

import StatusModal, { StatusModalContent } from "@/components/common/status-modal";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import UploadImage from "@/components/ui/upload-image";
import { ICampaignForBackend } from "@/types/campaign";

import useCreateCampaign from "../hooks/use-create-campaign";
import useUpdateCampaign from "../hooks/use-update-campaign";
import { campaignFormStore } from "../stores/campaign-form-store";

const RightCard = ({ campaignId }: { campaignId: string | undefined }) => {
  const { name, description, dungeons, image, publiclySeen } = campaignFormStore.use();

  const [modalContent, setModalContent] = useState<StatusModalContent>();

  const { mutate: createCampaign, isLoading: isCreating } = useCreateCampaign();
  const { mutate: updateCampaign, isLoading: isUpdating } = useUpdateCampaign();

  const onComplete = () => {
    const dataForBackend: ICampaignForBackend = {
      name,
      description,
      image,
      publiclySeen,
      dungeons: dungeons.map((dungeon) => dungeon._id),
    };

    if (campaignId)
      updateCampaign(
        {
          ...dataForBackend,
          campaignId,
        },
        {
          onSuccess: ({ id }) => {
            setModalContent({ state: "EDITED", id });
          },
          onError: (data) => {
            if (data instanceof AxiosError) {
              const errorMessages = z.array(z.string()).parse(data?.response?.data);
              setModalContent({ errorMessages, state: "ERRORED" });
            }
          },
        },
      );
    else
      createCampaign(dataForBackend, {
        onSuccess: ({ id }) => {
          setModalContent({ state: "CREATED", id });
        },
        onError: (data) => {
          if (data instanceof AxiosError) {
            const errorMessages = z.array(z.string()).parse(data?.response?.data);
            setModalContent({ errorMessages, state: "ERRORED" });
          }
        },
      });
  };

  return (
    <Box
      title="CAMPAIGN"
      wrapperClassName="h-full w-[30%]"
      className="flex h-full min-h-0 w-full flex-col items-center justify-between overflow-y-auto p-8"
    >
      <div className="flex h-full w-full flex-col justify-between gap-6">
        <div className="flex items-center gap-8">
          <div className="flex h-fit flex-1 flex-col gap-4">
            <Input
              label="Name"
              placeholder="The Crimson Abyss"
              className="m-0 flex w-full"
              value={name}
              onChange={(e) => campaignFormStore.name.set(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                className="bg-transparent"
                checked={publiclySeen}
                onCheckedChange={(checked) =>
                  campaignFormStore.publiclySeen.set(checked as boolean)
                }
                aria-label="Publicly seen"
              />
              Public campaign
            </div>
          </div>
          <UploadImage
            image={image}
            defaultImage={image}
            setImage={(image) => campaignFormStore.image.set(image)}
          />
        </div>
        <TextArea
          label="Description"
          placeholder="Venture into the heart of an enchanted forest, where the ancient spirits..."
          className="m-0 h-full"
          value={description}
          onChange={(e) => campaignFormStore.description.set(e.target.value)}
        />
        <div className="hidden w-full border-t border-white/20 lg:block" />
        <p>SELECTED ADVENTURES</p>
        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-4 overflow-y-auto">
          {dungeons.map((dungeon) => (
            <div className="flex gap-4" key={dungeon._id}>
              <Image
                src={dungeon.imageUrl || "/images/default-dungeon.png"}
                alt={dungeon.name}
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="truncate">{dungeon.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button className="w-fit" onClick={onComplete} isLoading={isCreating || isUpdating}>
            {campaignId ? "SAVE CHANGES" : "CREATE CAMPAIGN"}
          </Button>
        </div>
      </div>

      <StatusModal
        type="CAMPAIGN"
        open={!!modalContent}
        content={modalContent}
        onClose={() => setModalContent(undefined)}
      />
    </Box>
  );
};

export default RightCard;
