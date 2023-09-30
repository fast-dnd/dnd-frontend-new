import React, { useRef } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

import { campaignKey } from "@/services/campaign-service";
import { fileToBase64 } from "@/utils/b64";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import UploadImage from "@/components/ui/upload-image";

import useCreateCampaign from "../hooks/use-create-campaign";
import useUpdateCampaign from "../hooks/use-update-campaign";
import { campaignFormStore } from "../stores/campaign-form-store";

const RightCard = ({ campaignId }: { campaignId: string | undefined }) => {
  const queryClient = useQueryClient();

  const { name, description, dungeons, image } = campaignFormStore.use();

  const imageRef = useRef<HTMLInputElement>(null);

  const addImage = () => {
    imageRef.current?.click();
    imageRef.current?.addEventListener("change", async (e) => {
      campaignFormStore.image.set(
        (await fileToBase64((e.target as HTMLInputElement).files?.[0])) as string,
      );
    });
  };

  const { mutate: createCampaign, isLoading: isCreating } = useCreateCampaign();
  const { mutate: updateCampaign, isLoading: isUpdating } = useUpdateCampaign();

  const onComplete = () => {
    const dataForBackend = {
      name,
      description,
      image,
      dungeons: dungeons.map((dungeon) => dungeon._id),
    };

    if (campaignId)
      updateCampaign(
        {
          ...dataForBackend,
          campaignId,
        },
        { onSuccess: () => queryClient.invalidateQueries([campaignKey, campaignId]) },
      );
    else createCampaign(dataForBackend);
  };

  return (
    <Box title="CAMPAIGN" className="flex h-full w-full flex-col items-center justify-between p-8">
      <div className="flex h-fit w-full flex-col justify-between gap-6">
        <div className="flex items-center justify-between">
          <div className="flex h-fit">
            <Input
              label="Name"
              placeholder="The Crimson Abyss"
              className="m-0 flex w-full"
              value={name}
              onChange={(e) => campaignFormStore.name.set(e.target.value)}
            />
          </div>
          <UploadImage image={image} inputFile={imageRef} onClick={addImage} defaultImage={image} />
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
        <div className="flex flex-col gap-4">
          {dungeons.map((dungeon) => (
            <div className="flex gap-4" key={dungeon._id}>
              <Image
                src={dungeon.imageUrl || "/images/default-dungeon.png"}
                alt={dungeon.name}
                width={48}
                height={48}
              />
              {dungeon.name}
            </div>
          ))}
        </div>
      </div>
      <Button className="w-fit" onClick={onComplete} isLoading={isCreating || isUpdating}>
        {campaignId ? "SAVE CHANGES" : "CREATE CAMPAIGN"}
      </Button>
    </Box>
  );
};

export default RightCard;