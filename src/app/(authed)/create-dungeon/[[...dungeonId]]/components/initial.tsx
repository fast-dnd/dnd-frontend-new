"use client";

import { useRef } from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { fileToBase64 } from "@/utils/b64";
import { dungeonDuration, dungeonTags } from "@/utils/dungeon-options";
import useStore from "@/hooks/use-store";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import UploadImage from "@/components/ui/upload-image";

import { IInitialSchema, initialSchema } from "../schemas/initial-schema";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";
import tagsComboboxStyles from "../utils/tags-combobox-styles";

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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <form className="flex h-full w-full" onSubmit={handleSubmit(onSubmit)}>
      <Box
        title="CREATE DUNGEON"
        className="mb-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 lg:mb-0 lg:gap-8 lg:p-8"
        wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <p className="w-full text-lg font-semibold uppercase leading-7 tracking-[0.15em] lg:text-[22px]">
            1.
            {stepTitles[currentStep]}
          </p>
          <Button className="hidden w-fit whitespace-nowrap px-8 lg:block" variant="outline">
            NEXT STEP
          </Button>
        </div>
        <div className="hidden w-full border-t border-white/20 lg:block" />
        <div className="flex min-h-0 flex-1 basis-0">
          <div className="flex h-full w-full flex-col items-center gap-5 lg:flex-row lg:items-start lg:gap-8">
            <UploadImage
              image={image}
              inputFile={imageRef}
              onClick={addImage}
              defaultImage={dungeonFormData.imageUrl}
            />
            <div className="flex h-full w-full flex-1 flex-col gap-5 lg:gap-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                <div className="flex w-full flex-col gap-5 lg:w-1/2 lg:gap-8">
                  <Input
                    label="Name"
                    placeholder="The Enchanted Grove"
                    className="m-0"
                    {...register("name")}
                    state={errors?.name ? "error" : undefined}
                    errorMessage={errors?.name?.message}
                  />
                </div>
                <div className="flex w-full flex-col gap-5 lg:w-1/2 lg:gap-8 ">
                  <Controller
                    control={control}
                    name="duration"
                    defaultValue="blitz"
                    render={({ field }) => (
                      <ToggleGroup
                        className="inline-flex w-full items-center justify-center"
                        type="single"
                        label="Recommended Bob Verbal Engagement"
                        value={field.value}
                        onValueChange={field.onChange as any}
                        state={errors?.duration ? "error" : undefined}
                        errorMessage={errors?.duration?.message}
                      >
                        {dungeonDuration.map((duration) => (
                          <ToggleGroupItem
                            key={duration.value}
                            value={duration.value}
                            className="flex w-full items-center justify-center gap-2 border border-white/25 px-6 py-2 text-sm transition-all duration-300 data-[state=on]:border-tomato lg:px-10 lg:text-base"
                          >
                            {duration.icon({})}
                            {duration.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-0">
                <div className="flex w-full flex-col gap-5 lg:w-1/2 lg:gap-8 lg:pr-8">
                  <Input
                    label="Style"
                    placeholder="The Enchanted Grove"
                    className="m-0"
                    {...register("style")}
                    state={errors?.style ? "error" : undefined}
                    errorMessage={errors?.style?.message}
                  />
                </div>
                <div className="flex w-full flex-col gap-5 lg:-ml-1 lg:w-1/2 lg:gap-8">
                  <div>
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <ComboBox
                            {...field}
                            animate
                            label="Tags"
                            onChange={field.onChange as any}
                            noOptionsMessage={() => "No tags found"}
                            // isOptionDisabled={(option) => field.value.length >= 3}
                            className="w-full"
                            options={dungeonTags.map((tag) => ({
                              value: tag,
                              label: tag,
                            }))}
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder="Select 1 to 3 tags"
                            styles={tagsComboboxStyles as any}
                            state={errors?.tags ? "error" : undefined}
                            errorMessage={errors?.tags?.message}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <TextArea
                label="Description"
                placeholder="Venture into the heart of an enchanted forest, where the ancient spirits..."
                className="m-0 h-full"
                {...register("description")}
                state={errors?.description ? "error" : undefined}
                errorMessage={errors?.description?.message}
              />
              <div className="block w-full border-t border-white/20 lg:hidden" />
              <Button className="mb-4 block w-full whitespace-nowrap lg:hidden" variant="outline">
                NEXT STEP
              </Button>
            </div>
          </div>
        </div>
      </Box>
      <DevTool control={control} id="initial-form" />
    </form>
  );
};

export default Initial;
