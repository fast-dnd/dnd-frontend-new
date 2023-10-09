import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";

import Rewards from "@/components/rewards";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TextArea } from "@/components/ui/text-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import UploadImage from "@/components/ui/upload-image";
import { IReward } from "@/types/reward";
import { DungeonDuration, dungeonDurations, dungeonTags } from "@/utils/dungeon-options";

import { dungeonFormStore } from "../stores/dungeon-form-store";
import tagsComboboxStyles from "../utils/tags-combobox-styles";
import { tagsAttachLabel, TagsWithLabel } from "../utils/tags-utils";

const GeneralInfo = () => {
  const [isSelectingBg, setSelectingBg] = useState(false);

  const [selectedReward, setSelectedReward] = useState<IReward>();

  const dungeonFormData = dungeonFormStore.dungeonFormData;
  const { name, description } = dungeonFormData.use();

  return (
    <>
      <div className="flex min-h-0 flex-1 basis-0 overflow-y-auto">
        {isSelectingBg ? (
          <SelectBgScreen setSelectedReward={setSelectedReward} setSelectingBg={setSelectingBg} />
        ) : (
          <div className="flex h-full w-full flex-col items-center gap-5 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-col gap-4">
              <UploadImage
                image={dungeonFormData.imageUrl.get()}
                setImage={(image) => dungeonFormData.imageUrl.set(image)}
                defaultImage={dungeonFormData.imageUrl.get()}
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  className="bg-transparent"
                  onCheckedChange={(checked) =>
                    dungeonFormData.publiclySeen.set(checked as boolean)
                  }
                />
                Public adventure
              </div>
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
                    min={1}
                    max={100}
                    label="Reality level"
                    value={[dungeonFormData.realityLevel.get()]}
                    onValueChange={(newValue) => dungeonFormData.realityLevel.set(newValue[0])}
                  />
                  <Slider
                    min={1}
                    max={100}
                    label="Mistery level"
                    value={[dungeonFormData.misteryLevel.get()]}
                    onValueChange={(newValue) => dungeonFormData.misteryLevel.set(newValue[0])}
                  />
                  <Slider
                    min={1}
                    max={100}
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

const SelectBgScreen = ({
  setSelectedReward,
  setSelectingBg,
}: {
  setSelectedReward: (reward: IReward) => void;
  setSelectingBg: (selecting: boolean) => void;
}) => {
  const bgUrlObs = dungeonFormStore.dungeonFormData.backgroundUrl;

  return (
    <div className="flex flex-1 flex-col">
      <Rewards
        selectedReward={bgUrlObs.get()}
        onSelectReward={(reward) => {
          setSelectedReward(reward);
          bgUrlObs.set(reward.url);
        }}
      />
      <div className="mt-8 flex justify-end">
        <Button className="w-fit" onClick={() => setSelectingBg(false)}>
          CHOOSE BACKGROUND
        </Button>
      </div>
    </div>
  );
};
