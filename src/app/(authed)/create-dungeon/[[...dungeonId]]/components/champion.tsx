"use client";

import { FieldErrors } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";

import { IChampionSchema } from "../schemas/champion-schema";
import ChampionLocationWrapper, { IChampionLocationProps } from "./champion-location-wrapper";

const Champion = ({ status, setStatus, editIndex, setEditIndex }: IChampionLocationProps) => {
  return (
    <ChampionLocationWrapper
      status={status}
      setStatus={setStatus}
      editIndex={editIndex}
      setEditIndex={setEditIndex}
      description="Describe the champion and define custom names for its actions"
      locationOrChampion="Champion"
    >
      {({ register, errors }) => {
        const championErrors = errors as FieldErrors<IChampionSchema>;

        return (
          <>
            <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:basis-1/3 lg:gap-8">
              <Input
                label="Name"
                placeholder="Warrior"
                className="m-0"
                {...register("name")}
                state={championErrors?.name ? "error" : undefined}
                errorMessage={championErrors?.name?.message}
              />
              <div className="flex min-h-0 lg:h-full">
                <TextArea
                  label="Description"
                  placeholder="You are a brave warrior ready to fight..."
                  className="m-0 h-full"
                  {...register("description")}
                  state={championErrors?.description ? "error" : undefined}
                  errorMessage={championErrors?.description?.message}
                />
              </div>
            </div>
            <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:basis-1/3 lg:gap-8">
              <Input
                label="Heal action text"
                placeholder="Try to heal yourself"
                {...register("moveMapping.discover_health")}
                state={championErrors?.moveMapping?.discover_health ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.discover_health?.message}
              />
              <Input
                label="Team action text"
                placeholder="Explore the location"
                {...register("moveMapping.conversation_with_team")}
                state={championErrors?.moveMapping?.conversation_with_team ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.conversation_with_team?.message}
              />
            </div>
            <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:basis-1/3 lg:gap-8">
              <Input
                label="Mana action text"
                placeholder="Try to find something useful"
                {...register("moveMapping.discover_mana")}
                state={championErrors?.moveMapping?.discover_mana ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.discover_mana?.message}
              />
              <Input
                label="Rest action text"
                placeholder="Take a rest"
                {...register("moveMapping.rest")}
                state={championErrors?.moveMapping?.rest ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.rest?.message}
              />
            </div>
          </>
        );
      }}
    </ChampionLocationWrapper>
  );
};

export default Champion;
