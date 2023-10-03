"use client";

import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";

import { IReward } from "@/types/reward";
import { fileToBase64 } from "@/utils/b64";
import { DungeonDuration, dungeonDurations, dungeonTags } from "@/utils/dungeon-options";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TextArea } from "@/components/ui/text-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import UploadImage from "@/components/ui/upload-image";
import Rewards from "@/app/(authed)/profile/components/my-collection/rewards";

import { dungeonFormStore } from "../stores/dungeon-form-store";
import tagsComboboxStyles from "../utils/tags-combobox-styles";
import { tagsAttachLabel, TagsWithLabel } from "../utils/tags-utils";

const GeneralInfo = () => {
  const [isSelectingBg, setSelectingBg] = useState(false);

  const [selectedReward, setSelectedReward] = useState<IReward>();

  const dungeonFormData = dungeonFormStore.dungeonFormData;
  const { name, description } = dungeonFormData.use();

  const imageRef = useRef<HTMLInputElement>(null);

  const addImage = () => {
    imageRef.current?.click();
    imageRef.current?.addEventListener("change", async (e) => {
      dungeonFormData.imageUrl.set(
        (await fileToBase64((e.target as HTMLInputElement).files?.[0])) as string,
      );
    });
  };

  return (
    <>
      <div className="flex min-h-0 flex-1 basis-0">
        {isSelectingBg ? (
          <div className="flex flex-1 flex-col">
            <Rewards
              selectedReward={dungeonFormData.backgroundUrl.get()}
              onSelectReward={(reward) => {
                setSelectedReward(reward);
                dungeonFormData.backgroundUrl.set(reward.url);
              }}
            />
            <div className="mt-8 flex justify-end">
              <Button className="w-fit" onClick={() => setSelectingBg(false)}>
                CHOOSE BACKGROUND
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center gap-5 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-col gap-5 lg:gap-8">
              <UploadImage
                image={dungeonFormData.imageUrl.get()}
                inputFile={imageRef}
                onClick={addImage}
                defaultImage={dungeonFormData.imageUrl.get()}
              />
            </div>

            <div className="flex h-full w-full flex-1 flex-col gap-5 lg:gap-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                <div className="flex w-full flex-col gap-5 lg:w-1/2 lg:gap-8">
                  <Input
                    label="Name"
                    placeholder="The Enchanted Grove"
                    className="m-0"
                    value={name}
                    onChange={(e) => dungeonFormData.name.set(e.target.value)}
                  />
                </div>
                <div className="flex w-full flex-col gap-5 lg:w-1/2 lg:gap-8 ">
                  <ToggleGroup
                    className="inline-flex w-full items-center justify-center"
                    type="single"
                    label="Recommended duration"
                    value={dungeonFormData.recommendedResponseDetailsDepth.get()}
                    onValueChange={(value) =>
                      dungeonFormData.recommendedResponseDetailsDepth.set(value as DungeonDuration)
                    }
                  >
                    {dungeonDurations.map((duration) => (
                      <ToggleGroupItem key={duration.value} value={duration.value} className="py-4">
                        {duration.icon({})}
                        {duration.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-0">
                <div className="flex w-full gap-8">
                  <div className="flex w-full flex-col gap-5 lg:w-1/2 lg:gap-8 ">
                    <ComboBox
                      aria-label="Tags"
                      animate
                      label="Tags"
                      value={dungeonFormData.tags.get()}
                      onChange={(newValue) => dungeonFormData.tags.set(newValue as TagsWithLabel)}
                      noOptionsMessage={() => "No tags found"}
                      // isOptionDisabled={(option) => field.value.length >= 3}
                      options={tagsAttachLabel(dungeonTags)}
                      isMulti
                      closeMenuOnSelect={false}
                      placeholder="Select 1 to 3 tags"
                      styles={tagsComboboxStyles()}
                    />
                  </div>
                  <div className="flex w-full flex-col justify-between gap-5 lg:w-1/2">
                    <p>Background</p>
                    <div className="flex justify-between ">
                      <div className="flex items-center gap-2">
                        <BsFillImageFill />
                        {selectedReward ? (
                          <>
                            <p>{selectedReward.name}</p>
                            <div className="h-2 w-2 rotate-45 bg-white/25" />
                            <p>{selectedReward.rarity}</p>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        className="w-fit text-xs normal-case"
                        onClick={() => setSelectingBg(true)}
                      >
                        Change background
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                <div className="flex w-full flex-col gap-5 lg:w-1/2 lg:gap-8">
                  <Slider
                    label="Reality level"
                    value={[dungeonFormData.realityLevel.get()]}
                    onValueChange={(newValue) => dungeonFormData.realityLevel.set(newValue[0])}
                  />
                  <Slider
                    label="Misery level"
                    value={[dungeonFormData.misteryLevel.get()]}
                    onValueChange={(newValue) => dungeonFormData.misteryLevel.set(newValue[0])}
                  />
                  <Slider
                    label="Action level"
                    value={[dungeonFormData.actionLevel.get()]}
                    onValueChange={(newValue) => dungeonFormData.actionLevel.set(newValue[0])}
                  />
                </div>
                <div className="flex h-full w-full flex-col gap-5 lg:w-1/2 lg:gap-8">
                  <TextArea
                    label="Description"
                    fullHeight
                    className="m-0"
                    placeholder="Venture into the heart of an enchanted forest, where the ancient spirits..."
                    value={description}
                    onChange={(e) => dungeonFormData.description.set(e.target.value)}
                  />
                </div>
              </div>

              <div className="block w-full border-t border-white/20 lg:hidden" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GeneralInfo;
