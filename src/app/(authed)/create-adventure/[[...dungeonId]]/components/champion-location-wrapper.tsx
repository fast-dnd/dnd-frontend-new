import React from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { championSchema, IChampionSchema } from "../schemas/champion-schema";
import { ILocationSchema, locationSchema } from "../schemas/location-schema";
import { dungeonFormStore } from "../stores/dungeon-form-store";
import { IChampionsLocationsWrapperProps } from "./champions-locations-wrapper";

export interface IChampionLocationProps {
  editIndex: number;
  setEditIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface IChildrenProps {
  register: UseFormRegister<ILocationSchema | IChampionSchema>;
  errors: FieldErrors<ILocationSchema | IChampionSchema>;
}
interface IChampionLocationWrapperProps
  extends IChampionLocationProps,
    IChampionsLocationsWrapperProps {
  children: React.ReactNode | ((props: IChildrenProps) => React.ReactNode);
}

const ChampionLocationWrapper = ({
  children,
  locationOrChampion,
  editIndex,
  setEditIndex,
}: IChampionLocationWrapperProps) => {
  const statusObs = dungeonFormStore.status;
  const status = statusObs.use();

  const dungeonFormField = locationOrChampion === "Scene" ? "locations" : "champions";

  const chmpLocData = dungeonFormStore.dungeonFormData[dungeonFormField][editIndex].use();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IChampionSchema | ILocationSchema>({
    resolver: zodResolver(locationOrChampion === "Scene" ? locationSchema : championSchema),
    values: status === "EDITING" ? chmpLocData : undefined,
  });

  const onSubmit: SubmitHandler<ILocationSchema | IChampionSchema> = (data) => {
    // TODO: replace this with backend call and then update with the returned id
    if (status === "CREATING") {
      if ("moveMapping" in data)
        dungeonFormStore.dungeonFormData.champions.set((prev) => [
          ...prev,
          { ...data, _id: "", type: "standard" },
        ]);
      else
        dungeonFormStore.dungeonFormData.locations.set((prev) => [...prev, { ...data, _id: "" }]);
    } else if (status === "EDITING") {
      const _id = chmpLocData._id;
      if ("moveMapping" in data)
        dungeonFormStore.dungeonFormData.champions[editIndex].set({
          ...data,
          _id,
          type: "standard",
        });
      else dungeonFormStore.dungeonFormData.locations[editIndex].set({ ...data, _id });
    }

    statusObs.set("LIST");
    setEditIndex(-1);
  };

  const onCancel = () => {
    reset();
    statusObs.set("LIST");
    setEditIndex(-1);
  };

  return (
    <form className="flex h-full flex-col gap-8 lg:w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-full flex-col gap-5 lg:gap-8">
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
