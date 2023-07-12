"use client";

import { Dispatch, SetStateAction } from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { SubmitHandler, useForm } from "react-hook-form";

import useStore from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";

import { championSchema, IChampionSchema } from "../schemas/champion-schema";
import { useDungeonFormStore } from "../stores/form-store";

interface IChampionProps {
  status: "LIST" | "CREATING" | "EDITING";
  setStatus: Dispatch<SetStateAction<"LIST" | "CREATING" | "EDITING">>;
  editIndex: number;
  setEditIndex: Dispatch<SetStateAction<number>>;
}

const Champion = ({ status, setStatus, editIndex, setEditIndex }: IChampionProps) => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IChampionSchema>({
    resolver: zodResolver(championSchema),
    values:
      status === "EDITING" ? dungeonFormStore?.dungeonFormData.champions[editIndex] : undefined,
  });

  if (!dungeonFormStore) return null;

  const { dungeonFormData, updateDungeonFormData } = dungeonFormStore;

  const onSubmit: SubmitHandler<IChampionSchema> = (data) => {
    if (status === "CREATING") {
      updateDungeonFormData(
        produce(dungeonFormData, (draft) => {
          draft.champions.push(data);
        }),
      );
    } else if (status === "EDITING") {
      updateDungeonFormData(
        produce(dungeonFormData, (draft) => {
          draft.champions[editIndex] = data;
        }),
      );
    }

    setStatus("LIST");
    setEditIndex(-1);
  };

  const onCancel = () => {
    reset();
    setStatus("LIST");
    setEditIndex(-1);
  };

  return (
    <form className="flex h-full flex-col gap-8 lg:w-full" onSubmit={handleSubmit(onSubmit)}>
      <p className="-my-1 text-xl font-semibold uppercase tracking-[0.07em] text-white/50">
        {status === "CREATING" ? "Create" : "Edit"} Champion
      </p>
      <p className="-my-1 text-lg tracking-[0.07em] text-white/50">
        Describe the champion and define custom names for its actions
      </p>
      <div className="flex h-full flex-col gap-5 lg:flex-row lg:gap-8">
        <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:basis-1/3 lg:gap-8">
          <Input
            label="Name"
            placeholder="Warrior"
            className="m-0"
            {...register("name")}
            state={errors?.name ? "error" : undefined}
            errorMessage={errors?.name?.message}
          />
          <div className="flex min-h-0 lg:h-full">
            <TextArea
              label="Description"
              placeholder="You are a brave warrior ready to fight..."
              className="m-0 h-full"
              {...register("description")}
              state={errors?.description ? "error" : undefined}
              errorMessage={errors?.description?.message}
            />
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:basis-1/3 lg:gap-8">
          <Input
            label="Heal action text"
            placeholder="Try to heal yourself"
            {...register("moveMapping.discover_health")}
            state={errors?.moveMapping?.discover_health ? "error" : undefined}
            errorMessage={errors?.moveMapping?.discover_health?.message}
          />
          <Input
            label="Team action text"
            placeholder="Explore the location"
            {...register("moveMapping.conversation_with_team")}
            state={errors?.moveMapping?.conversation_with_team ? "error" : undefined}
            errorMessage={errors?.moveMapping?.conversation_with_team?.message}
          />
        </div>
        <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:basis-1/3 lg:gap-8">
          <Input
            label="Mana action text"
            placeholder="Try to find something useful"
            {...register("moveMapping.discover_mana")}
            state={errors?.moveMapping?.discover_mana ? "error" : undefined}
            errorMessage={errors?.moveMapping?.discover_mana?.message}
          />
          <Input
            label="Rest action text"
            placeholder="Take a rest"
            {...register("moveMapping.rest")}
            state={errors?.moveMapping?.rest ? "error" : undefined}
            errorMessage={errors?.moveMapping?.rest?.message}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between gap-8 lg:justify-end">
        <Button
          className="w-fit text-sm lg:text-lg"
          variant="ghost"
          onClick={onCancel}
          type="reset"
        >
          CANCEL
        </Button>
        <Button
          className="w-fit whitespace-nowrap px-8 text-sm uppercase lg:text-lg"
          variant="outline"
        >
          {status === "CREATING" ? "ADD CHAMPION" : "EDIT CHAMPION"}
        </Button>
      </div>
      <DevTool control={control} id={`champion-${editIndex}-form`} />
    </form>
  );
};

export default Champion;
