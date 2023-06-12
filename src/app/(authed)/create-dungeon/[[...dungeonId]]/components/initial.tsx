"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import UploadImage from "@/components/ui/upload-image";
import useStore from "@/hooks/use-store";
import { fileToBase64 } from "@/utils/b64";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IInitialSchema, initialSchema } from "../schemas/initial-schema";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";

const Initial = () => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IInitialSchema>({
    resolver: zodResolver(initialSchema),
    values: dungeonFormStore?.dungeonFormData,
  });

  const image = watch("image");
  const imageRef = useRef<HTMLInputElement>(null);

  if (!dungeonFormStore) return null;

  const { currentStep, setCurrentStep, dungeonFormData, updateDungeonFormData } = dungeonFormStore;

  const onSubmit: SubmitHandler<IInitialSchema> = (data) => {
    updateDungeonFormData(data);
    setCurrentStep("LOCATIONS");
  };

  const addImage = () => {
    imageRef.current?.click();
    imageRef.current?.addEventListener("change", async (e) => {
      setValue("image", (await fileToBase64((e.target as HTMLInputElement).files?.[0])) as string);
    });
  };

  return (
    <form className="h-full flex" onSubmit={handleSubmit(onSubmit)}>
      <Box title="CREATE DUNGEON" className="flex flex-col gap-8 min-h-0 flex-1 w-[1200px] p-8">
        <div className="flex flex-row items-center gap-8 justify-between">
          <p className="text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
            1.
            {stepTitles[currentStep]}
          </p>
          <Button className="w-fit px-8 whitespace-nowrap" variant="outline">
            NEXT STEP
          </Button>
        </div>
        <div className="w-full border-t border-white/20" />
        <div className="flex flex-1 basis-0 min-h-0">
          <div className="flex flex-row w-full gap-8 h-full">
            <UploadImage
              image={image}
              inputFile={imageRef}
              onClick={addImage}
              defaultImage={dungeonFormData.imageUrl}
            />
            <div className="flex flex-col gap-8 flex-1">
              <Input
                label="Name"
                placeholder="The Enchanted Grove"
                className="w-1/2 m-0"
                {...register("name")}
                state={errors?.name ? "error" : undefined}
                errorMessage={errors?.name?.message}
              />
              <div className="flex flex-1 w-full min-h-0">
                <TextArea
                  label="Description"
                  placeholder="Venture into the heart of an enchanted forest, where the ancient spirits..."
                  className="h-full m-0"
                  disableResize
                  {...register("description")}
                  state={errors?.description ? "error" : undefined}
                  errorMessage={errors?.description?.message}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
      <DevTool control={control} id="initial-form" />
    </form>
  );
};

export default Initial;
