"use client";

import React, { useState } from "react";
import { stepTitles, steps } from "./types/create-dungeon";
import { useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import dndService, {
  IPostChampion,
  IPostLocation,
} from "@/services/dndService";
import Dungeon from "./components/dungeon";
import Locations from "./components/locations";
import Champions from "./components/champions";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";

const CreateDungeon = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [locations, setLocations] = useState<IPostLocation[]>([]);
  const [champions, setChampions] = useState<IPostChampion[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [dungeonId, setDungeonId] = useState<string>("");

  const onSubmit = () => {
    dndService.postLocations({ locations }).then((re) => {
      dndService.postChampions({ champions }).then((res) => {
        dndService
          .postDungeon({
            name,
            description,
            locations: re.data.map((loc) => loc._id),
            champions: res.data.map((champ) => champ._id),
          })
          .then((resp) => setDungeonId(resp.data._id));
      });
    });
  };

  return (
    <div className="flex justify-center h-full p-16 overflow-y-hidden">
      <div className="flex flex-col gap-8">
        <Link
          className="flex flex-row gap-1 w-fit font-medium items-center tracking-[0.08em]  uppercase"
          href="/home"
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </Link>

        <div className="flex h-full">
          <Box
            title="CREATE DUNGEON"
            className="flex flex-col gap-8 min-h-0 flex-1 w-[1200px] p-8"
          >
            <div className="flex flex-row items-center gap-8 justify-between">
              <p className=" text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
                {step < steps.length - 1 && `${step + 1}. `}
                {stepTitles[step]}
              </p>
              {step > 0 && step < steps.length - 1 && (
                <Button
                  className="flex flex-row gap-1 font-medium tracking-[0.08em] w-fit text-white/50 uppercase"
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                >
                  <AiOutlineLeft className="inline-block" />
                  PREVIOUS
                </Button>
              )}
              {step < steps.length - 1 && (
                <Button
                  className="w-fit px-8 whitespace-nowrap"
                  onClick={() => {
                    if (step === steps.length - 2) {
                      onSubmit();
                    }
                    setStep(step + 1);
                  }}
                  variant={step < steps.length - 2 ? "outline" : "primary"}
                  disabled={
                    step === steps.length - 2 &&
                    (locations.length < 3 || champions.length < 2)
                  }
                >
                  {step < steps.length - 2 ? "NEXT STEP" : "FINISH"}
                </Button>
              )}
            </div>
            <div className="w-full border-t border-white/20" />
            <div className="flex flex-1 basis-0 min-h-0">
              {steps[step] === "INITIAL" && (
                <Dungeon
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                  image={image}
                  setImage={setImage}
                />
              )}
              {steps[step] === "LOCATIONS" && (
                <Locations locations={locations} setLocations={setLocations} />
              )}
              {steps[step] === "CHAMPIONS" && (
                <Champions champions={champions} setChampions={setChampions} />
              )}
              {steps[step] === "FINAL" && (
                <div className="w-full">
                  {dungeonId.length === 0 && <Spinner />}
                  {dungeonId.length > 0 && (
                    <div className="flex flex-col gap-8">
                      <p className="text-xl tracking-[0.07em] -my-1 text-white/50">
                        Copy to share with your friends!
                      </p>
                      <div className="flex items-center gap-8">
                        <p className="px-4 py-2 bg-white/5 font-medium text-2xl tracking-widest w-full">
                          {dungeonId}
                        </p>
                        <Button
                          className="w-fit px-8"
                          onClick={() =>
                            navigator.clipboard.writeText(dungeonId)
                          }
                        >
                          COPY
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CreateDungeon;
