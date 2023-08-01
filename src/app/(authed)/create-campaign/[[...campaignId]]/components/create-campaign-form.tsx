"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLeft } from "react-icons/ai";
import { toast } from "react-toastify";

import { ICampaignDetail } from "@/types/dungeon";
import { fileToBase64 } from "@/utils/b64";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import UploadImage from "@/components/ui/upload-image";
import MobileNavbar from "@/components/mobile-navbar";

import useCreateCampaign from "../hooks/use-create-campaign";
import useUpdateCampaign from "../hooks/use-update-campaign";
import { campaignSchema, ICampaignSchema } from "../schemas/campaign-schema";
import CreateCampaignDungeon from ".//create-campaign-dungeon";

const CreateCampaignForm = ({ campaign }: { campaign?: ICampaignDetail }) => {
  const campaignId = campaign?._id;

  const [dungeonId, setDungeonId] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ICampaignSchema>({
    resolver: zodResolver(campaignSchema),
    defaultValues: campaign
      ? {
          ...campaign,
          dungeons: campaign.dungeons.map((dungeon) => dungeon._id),
        }
      : { description: "", dungeons: [], name: "" },
  });

  const image = watch("image");
  const imageRef = useRef<HTMLInputElement>(null);

  const dungeons = watch("dungeons");

  const addDungeon = (dungeonId: string) => {
    if (!dungeons.includes(dungeonId)) {
      setValue("dungeons", [...dungeons, dungeonId]);
    } else {
      toast.error("Adventure already in campaign");
    }
  };

  const removeDungeon = (dungeonId: string) => {
    const newDungeons = [...dungeons];
    const index = newDungeons.indexOf(dungeonId);
    if (index > -1) newDungeons.splice(index, 1);
    setValue("dungeons", newDungeons);
  };

  const { mutate: createCampaign, isLoading: isCreating } = useCreateCampaign();
  const { mutate: updateCampaign, isLoading: isUpdating } = useUpdateCampaign();

  const onSubmit: SubmitHandler<ICampaignSchema> = (data) => {
    if (campaignId) updateCampaign({ ...data, campaignId });
    else createCampaign(data);
  };

  const addImage = () => {
    imageRef.current?.click();
    imageRef.current?.addEventListener("change", async (e) => {
      const newImage = (await fileToBase64((e.target as HTMLInputElement).files?.[0])) as string;
      if (newImage) setValue("image", newImage);
    });
  };

  return (
    <div className="flex justify-center overflow-y-auto pb-8">
      <div className="mt-4 flex flex-col items-center gap-4">
        <MobileNavbar />
        <Link
          className="hidden items-center gap-1 text-lg font-medium uppercase tracking-[0.08em] lg:flex"
          href="/home"
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className=" px-5 lg:min-w-fit lg:px-0">
          <Box
            title={campaignId ? "EDIT CAMPAIGN" : "CREATE CAMPAIGN"}
            className="flex flex-col items-center gap-5 p-5 lg:gap-8 lg:p-8"
          >
            <div className="lag:gap-8 flex flex-col items-center gap-5 lg:flex-row">
              <UploadImage
                image={image}
                inputFile={imageRef}
                onClick={addImage}
                defaultImage={campaign?.imageUrl || "/images/default-dungeon.png"}
              />
              <div className="flex w-80 flex-col justify-center gap-4 lg:w-96">
                <Input
                  label="Campaign name"
                  className="text-xl tracking-[0.07em]"
                  {...register("name")}
                  state={errors?.name ? "error" : undefined}
                  errorMessage={errors?.name?.message}
                />
                <TextArea
                  label="Description"
                  className="m-0 h-full"
                  {...register("description")}
                  state={errors?.description ? "error" : undefined}
                  errorMessage={errors?.description?.message}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-5 lg:gap-8">
              {!!campaignId && (
                <>
                  <div className="flex max-h-[250px] w-full flex-col gap-1 overflow-y-auto">
                    {dungeons?.map((dungeon) => (
                      <CreateCampaignDungeon
                        onDelete={() => removeDungeon(dungeon)}
                        dungeonId={dungeon}
                        key={dungeon}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-end gap-5 lg:gap-8">
                    <Input
                      placeholder="Enter dungeon ID..."
                      onChange={(e) => setDungeonId(e.target.value)}
                      className="m-0 h-9 min-w-[200px] lg:h-14 lg:text-xl"
                    />
                    <Button
                      type="button"
                      disabled={!dungeonId}
                      variant={dungeonId ? "primary" : "outline"}
                      className="h-9 w-full px-8 lg:h-14 lg:w-fit"
                      onClick={() => addDungeon(dungeonId)}
                    >
                      ADD ADVENTURE
                    </Button>
                  </div>
                </>
              )}

              <Button type="submit" isLoading={isCreating || isUpdating}>
                {campaignId ? "UPDATE" : "CREATE"}
              </Button>
            </div>
          </Box>
        </form>
        <DevTool control={control} id="campaign-form" />
      </div>
    </div>
  );
};

export default CreateCampaignForm;
