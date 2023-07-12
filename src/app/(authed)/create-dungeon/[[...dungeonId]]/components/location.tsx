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

import { ILocationSchema, locationSchema } from "../schemas/location-schema";
import { useDungeonFormStore } from "../stores/form-store";

interface ILocationProps {
  status: "LIST" | "CREATING" | "EDITING";
  setStatus: Dispatch<SetStateAction<"LIST" | "CREATING" | "EDITING">>;
  editIndex: number;
  setEditIndex: Dispatch<SetStateAction<number>>;
}

const Location = ({ status, setStatus, editIndex, setEditIndex }: ILocationProps) => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ILocationSchema>({
    resolver: zodResolver(locationSchema),
    values:
      status === "EDITING" ? dungeonFormStore?.dungeonFormData.locations[editIndex] : undefined,
  });

  if (!dungeonFormStore) return null;

  const { dungeonFormData, updateDungeonFormData } = dungeonFormStore;

  const onSubmit: SubmitHandler<ILocationSchema> = (data) => {
    if (status === "CREATING") {
      updateDungeonFormData(
        produce(dungeonFormData, (draft) => {
          draft.locations.push(data);
        }),
      );
    } else if (status === "EDITING") {
      updateDungeonFormData(
        produce(dungeonFormData, (draft) => {
          draft.locations[editIndex] = data;
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
        {status === "CREATING" ? "Add Location" : "Edit Location"}
      </p>
      <div className="flex h-full flex-col gap-5 lg:flex-row lg:gap-8">
        <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:basis-1/3 lg:gap-8">
          <Input
            label="Name"
            placeholder="Misty Forest"
            className="m-0"
            {...register("name")}
            state={errors?.name ? "error" : undefined}
            errorMessage={errors?.name?.message}
          />
          <div className="flex min-h-0 lg:h-full">
            <TextArea
              label="Mission"
              placeholder="The goal is to find the secret treasure hidden somewhere in the old castle..."
              className="m-0 h-full"
              {...register("mission")}
              state={errors?.mission ? "error" : undefined}
              errorMessage={errors?.mission?.message}
            />
          </div>
        </div>
        <div className="flex min-h-0 lg:h-full lg:basis-1/3">
          <TextArea
            label="Description"
            placeholder="Venture into the heart of an enchanted forest..."
            className="m-0 h-full"
            {...register("description")}
            state={errors?.description ? "error" : undefined}
            errorMessage={errors?.description?.message}
          />
        </div>
        <div className="flex min-h-0 lg:h-full lg:basis-1/3">
          <TextArea
            label="Transition"
            placeholder="You leave this place to enter the dark swamp..."
            className="m-0 h-full"
            {...register("transition")}
            state={errors?.transition ? "error" : undefined}
            errorMessage={errors?.transition?.message}
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
        <Button className="w-fit whitespace-nowrap px-8 text-sm lg:text-lg" variant="outline">
          {status === "CREATING" ? "ADD LOCATION" : "EDIT LOCATION"}
        </Button>
      </div>
      <DevTool control={control} id={`location-${editIndex}-form`} />
    </form>
  );
};

export default Location;
