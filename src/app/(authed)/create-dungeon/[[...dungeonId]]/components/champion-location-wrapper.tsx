import React from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { championSchema, IChampionSchema } from "../schemas/champion-schema";
import { ILocationSchema, locationSchema } from "../schemas/location-schema";
import { dungeonFormStore } from "../stores/dungeon-form-store";
import { StatusType } from "../utils/step-utils";

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

  const chmpLocData = dungeonFormStore.dungeonFormData[dungeonFormField][editIndex].use();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IChampionSchema | ILocationSchema>({
    resolver: zodResolver(locationOrChampion === "Champion" ? championSchema : locationSchema),
    values: status === "EDITING" ? chmpLocData : undefined,
  });

  const onSubmit: SubmitHandler<ILocationSchema | IChampionSchema> = (data) => {
    // TODO: replace this with backend call and then update with the returned id
    if (status === "CREATING") {
      if ("moveMapping" in data)
        dungeonFormStore.dungeonFormData.champions.set((prev) => [...prev, { ...data, _id: "" }]);
      else
        dungeonFormStore.dungeonFormData.locations.set((prev) => [...prev, { ...data, _id: "" }]);
    } else if (status === "EDITING") {
      const _id = chmpLocData._id;
      if ("moveMapping" in data)
        dungeonFormStore.dungeonFormData.champions[editIndex].set({ ...data, _id });
      else dungeonFormStore.dungeonFormData.locations[editIndex].set({ ...data, _id });
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
