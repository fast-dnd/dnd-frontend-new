"use client";

import { useRef } from "react";
import Link from "next/link";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLeft } from "react-icons/ai";

import { ICampaignDetail } from "@/types/campaign";
import { IDungeon } from "@/types/dungeon";
import { campaignKey } from "@/services/campaign-service";
import { fileToBase64 } from "@/utils/b64";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import UploadImage from "@/components/ui/upload-image";
import MobileNavbar from "@/components/mobile-navbar";
import tagsComboboxStyles from "@/app/(authed)/create-dungeon/[[...dungeonId]]/utils/tags-combobox-styles";

import useCreateCampaign from "../hooks/use-create-campaign";
import useUpdateCampaign from "../hooks/use-update-campaign";
import { campaignSchema, ICampaignSchema } from "../schemas/campaign-schema";

const CreateCampaignForm = ({
  campaign,
  myDungeons,
}: {
  campaign?: ICampaignDetail;
  myDungeons: IDungeon[];
}) => {
  const queryClient = useQueryClient();

  const campaignId = campaign?._id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ICampaignSchema>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      ...campaign,
      dungeons: campaign?.dungeons.map((dungeon) => ({ value: dungeon._id, label: dungeon.name })),
    },
  });

  const image = watch("image");
  const imageRef = useRef<HTMLInputElement>(null);

  const { mutate: createCampaign, isLoading: isCreating } = useCreateCampaign();
  const { mutate: updateCampaign, isLoading: isUpdating } = useUpdateCampaign();

  const onSubmit: SubmitHandler<ICampaignSchema> = (data) => {
    const dataForBackend = {
      ...data,
      dungeons: data.dungeons.map((dungeon) => dungeon.value),
    };

    if (campaignId)
      updateCampaign(
        { ...dataForBackend, campaignId },
        { onSuccess: () => queryClient.invalidateQueries([campaignKey, campaignId]) },
      );
    else createCampaign(dataForBackend);
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
              <Controller
                control={control}
                name="dungeons"
                render={({ field }) => {
                  return (
                    <ComboBox
                      {...field}
                      aria-label="Dungeons"
                      animate
                      label="Dungeons"
                      onChange={(newValue) =>
                        field.onChange(newValue as { value: string; label: string }[])
                      }
                      noOptionsMessage={() => "No dungeons found"}
                      // isOptionDisabled={(option) => field.value.length >= 3}
                      className="w-full"
                      options={myDungeons.map((dungeon) => ({
                        value: dungeon._id,
                        label: dungeon.name,
                      }))}
                      isMulti
                      closeMenuOnSelect={false}
                      styles={tagsComboboxStyles(Boolean(errors?.dungeons))}
                      state={errors?.dungeons ? "error" : undefined}
                      errorMessage={errors?.dungeons?.message}
                    />
                  );
                }}
              />

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
