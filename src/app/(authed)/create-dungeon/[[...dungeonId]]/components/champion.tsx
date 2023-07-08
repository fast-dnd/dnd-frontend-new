"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IChampionSchema, championSchema } from "../schemas/champion-schema";
import { useDungeonFormStore } from "../stores/form-store";
import useStore from "@/hooks/use-store";
import { DevTool } from "@hookform/devtools";

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
    <form className="flex flex-col h-full gap-8 md:w-full" onSubmit={handleSubmit(onSubmit)}>
      <p className="uppercase font-semibold text-xl tracking-[0.07em] -my-1 text-white/50">
        {status === "CREATING" ? "Create" : "Edit"} Champion
      </p>
      <p className="text-lg tracking-[0.07em] -my-1 text-white/50">
        Describe the champion and define custom names for its actions
      </p>
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 h-full">
        <div className="flex flex-col md:basis-1/3 gap-5 md:gap-8 md:h-full min-h-0">
          <Input
            label="Name"
            placeholder="Warrior"
            className="m-0"
            {...register("name")}
            state={errors?.name ? "error" : undefined}
            errorMessage={errors?.name?.message}
          />
          <div className="flex min-h-0 md:h-full">
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
        <div className="flex flex-col md:basis-1/3 gap-5 md:gap-8 md:h-full min-h-0">
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
        <div className="flex flex-col md:basis-1/3 gap-5 md:gap-8 md:h-full min-h-0">
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
      <div className="flex flex-row justify-between md:justify-end gap-8">
        <Button
          className="text-sm md:text-lg w-fit"
          variant="ghost"
          onClick={onCancel}
          type="reset"
        >
          CANCEL
        </Button>
        <Button
          className="whitespace-nowrap text-sm md:text-lg w-fit px-8 uppercase"
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
