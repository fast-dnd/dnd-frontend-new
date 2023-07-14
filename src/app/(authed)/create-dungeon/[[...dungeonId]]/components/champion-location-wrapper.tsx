import React from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

import useStore from "@/hooks/use-store";
import { Button } from "@/components/ui/button";

import { championSchema, IChampionSchema } from "../schemas/champion-schema";
import { ILocationSchema, locationSchema } from "../schemas/location-schema";
import { StatusType, useDungeonFormStore } from "../stores/form-store";

export interface IChampionLocationProps {
  status: StatusType;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  editIndex: number;
  setEditIndex: React.Dispatch<React.SetStateAction<number>>;
}
interface IChampionLocationWrapperProps extends IChampionLocationProps {
  description?: string;
  locationOrChampion: "Location" | "Champion";
  children: React.ReactNode | ((props: IChildrenProps) => React.ReactNode);
}

interface IChildrenProps {
  register: UseFormRegister<ILocationSchema | IChampionSchema>;
  errors: FieldErrors<ILocationSchema | IChampionSchema>;
}

const ChampionLocationWrapper = ({
  description,
  children,
  locationOrChampion,
  status,
  setStatus,
  editIndex,
  setEditIndex,
}: IChampionLocationWrapperProps) => {
  const dungeonFormField = locationOrChampion === "Location" ? "locations" : "champions";

  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IChampionSchema | ILocationSchema>({
    resolver: zodResolver(locationOrChampion === "Champion" ? championSchema : locationSchema),
    values:
      status === "EDITING"
        ? dungeonFormStore?.dungeonFormData[dungeonFormField][editIndex]
        : undefined,
  });

  if (!dungeonFormStore) return null;

  const { dungeonFormData, updateDungeonFormData } = dungeonFormStore;

  const onSubmit: SubmitHandler<ILocationSchema | IChampionSchema> = (data) => {
    if (status === "CREATING") {
      updateDungeonFormData(
        produce(dungeonFormData, (draft) => {
          if ("moveMapping" in data) draft.champions.push(data);
          else draft.locations.push(data);
        }),
      );
    } else if (status === "EDITING") {
      updateDungeonFormData(
        produce(dungeonFormData, (draft) => {
          if ("moveMapping" in data) draft.champions[editIndex] = data;
          else draft.locations[editIndex] = data;
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
        {status === "CREATING" ? `Create ${locationOrChampion}` : `Edit ${locationOrChampion}`}
      </p>
      {description && (
        <p className="-my-1 text-lg tracking-[0.07em] text-white/50">{description}</p>
      )}

      <div className="flex h-full flex-col gap-5 lg:flex-row lg:gap-8">
        {typeof children === "function" ? children({ register, errors }) : children}
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
          {status === "CREATING" ? `ADD ${locationOrChampion}` : `EDIT ${locationOrChampion}`}
        </Button>
      </div>
      <DevTool control={control} id={`${locationOrChampion}-${editIndex}-form`} />
    </form>
  );
};

export default ChampionLocationWrapper;
