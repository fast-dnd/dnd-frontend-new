"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import UploadImage from "@/components/ui/upload-image";
import useStore from "@/hooks/use-store";
import { fileToBase64 } from "@/utils/b64";
import { dungeonDuration, dungeonTags } from "@/utils/dungeon-options";
import { cn } from "@/utils/style-utils";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IInitialSchema, initialSchema } from "../schemas/initial-schema";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { GiCancel } from "react-icons/gi";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const animatedComponents = makeAnimated();

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
    <form className="h-full flex" onSubmit={handleSubmit(onSubmit)}>
      <Box
        title="CREATE DUNGEON"
        className="flex flex-col min-h-0 flex-1 md:w-[1200px] p-5 gap-5 md:p-8 md:gap-8 mb-4 md:mb-0"
      >
        <div className="flex flex-row items-center gap-8 justify-between">
          <p className="text-lg md:text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
            1.
            {stepTitles[currentStep]}
          </p>
          <Button className="hidden md:block w-fit px-8 whitespace-nowrap" variant="outline">
            NEXT STEP
          </Button>
        </div>
        <div className="hidden md:block w-full border-t border-white/20" />
        <div className="flex flex-1 basis-0 min-h-0">
          <div className="flex flex-col items-center md:items-start md:flex-row w-full gap-5 md:gap-8 h-full">
            <UploadImage
              image={image}
              inputFile={imageRef}
              onClick={addImage}
              defaultImage={dungeonFormData.imageUrl}
            />
            <div className="flex flex-col w-full gap-5 md:gap-8 flex-1 h-full">
              <div className="flex flex-col md:flex-row gap-5 md:gap-8">
                <div className="w-full md:w-1/2 flex flex-col gap-5 md:gap-8">
                  <Input
                    label="Name"
                    placeholder="The Enchanted Grove"
                    className="m-0"
                    {...register("name")}
                    state={errors?.name ? "error" : undefined}
                    errorMessage={errors?.name?.message}
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-5 md:gap-8 items-center justify-center">
                  <Controller
                    control={control}
                    name="duration"
                    defaultValue="default-blitz"
                    render={({ field }) => (
                      <ToggleGroup
                        className="inline-flex items-center justify-center"
                        type="single"
                        label="Recommended duration"
                        value={field.value}
                        onValueChange={field.onChange as any}
                      >
                        {dungeonDuration.map((duration) => (
                          <ToggleGroupItem
                            key={duration.value}
                            value={duration.value}
                            className="border-white/25 border text-sm md:text-base px-6 md:px-10 py-[8px] data-[state=on]:border-tomato transition-all duration-300 flex gap-2 items-center justify-center"
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
              <div className="flex flex-col md:flex-row gap-5 md:gap-0">
                <div className="w-full md:w-1/2 flex flex-col gap-5 md:gap-8 md:pr-8">
                  <Input
                    label="Style"
                    placeholder="The Enchanted Grove"
                    className="m-0"
                    {...register("style")}
                    state={errors?.style ? "error" : undefined}
                    errorMessage={errors?.style?.message}
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-5 md:gap-8 md:-ml-1">
                  <div>
                    <div
                      className={cn(
                        "bg-white/10 backdrop-blur-none text-sm tracking-[0.07em] px-4 py-1 w-fit",
                      )}
                    >
                      Tags
                    </div>
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field }) => {
                        // console.log(field.value);
                        // TODO: create a custom component for this
                        return (
                          <Select
                            {...field}
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
                            components={animatedComponents}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "transparent",
                                border: "#ffffff50 1px solid",
                                borderRadius: 0,
                                paddingTop: 2,
                                paddingBottom: 2,
                                paddingLeft: 4,
                                boxShadow: "none",
                                outline: "#ffffff50 1px solid",
                                "&:hover": {
                                  borderColor: "#ffffff50",
                                },
                                ":focus-within": {
                                  borderColor: "#ff5a5a",
                                },
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                              clearIndicator: () => ({
                                display: "none",
                              }),
                              multiValue: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "#ffffff10",
                                lineHeight: "28px",
                                letterSpacing: "2.4px",
                                paddingLeft: "8px",
                              }),
                              multiValueLabel: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#ffffff",
                                fontSize: "12px",
                                padding: 0,
                              }),
                              multiValueRemove: (baseStyles, state) => ({
                                ...baseStyles,
                                paddingRight: "8px",
                                color: "#ffffff",
                                ":hover": {
                                  backgroundColor: "#ffffff10",
                                  color: "#ffffff",
                                },
                              }),
                              menu: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "#606768",
                              }),
                              menuList: (baseStyles, state) => ({
                                ...baseStyles,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                padding: "16px",
                              }),
                              option: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "#555b5c",
                                color: "#ffffff",
                                ":hover": {
                                  backgroundColor: "#ffffff10",
                                  color: "#ffffff",
                                },
                                width: "fit-content",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                duration: "0.2s",
                              }),
                              noOptionsMessage: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#ffffff",
                                textAlign: "center",
                                width: "100%",
                              }),
                              input: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#ffffff",
                              }),
                            }}
                          />
                        );
                      }}
                    />
                    {errors.tags && (
                      <p className="text-sm inline-flex flex-row items-center justify-start gap-2 text-error">
                        <GiCancel /> {errors.tags.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <TextArea
                label="Description"
                placeholder="Venture into the heart of an enchanted forest, where the ancient spirits..."
                className="h-full m-0"
                {...register("description")}
                state={errors?.description ? "error" : undefined}
                errorMessage={errors?.description?.message}
              />
              <div className="md:hidden block w-full border-t border-white/20" />
              <Button className="md:hidden block w-full whitespace-nowrap" variant="outline">
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
