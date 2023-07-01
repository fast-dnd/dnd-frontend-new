"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILocationSchema, locationSchema } from "../schemas/location-schema";
import { useDungeonFormStore } from "../stores/form-store";
import useStore from "@/hooks/use-store";
import { DevTool } from "@hookform/devtools";

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
    <form className="flex flex-col h-full gap-8" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-xl tracking-[0.07em] -my-1 text-white/50">Add location</p>
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 h-full">
        <div className="flex flex-col md:basis-1/3 gap-5 md:gap-8 md:h-full min-h-0">
          <Input
            label="Name"
            placeholder="Misty Forest"
            className="m-0"
            {...register("name")}
            state={errors?.name ? "error" : undefined}
            errorMessage={errors?.name?.message}
          />
          <div className="flex min-h-0 md:h-full">
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
        <div className="flex min-h-0 md:basis-1/3 md:h-full">
          <TextArea
            label="Description"
            placeholder="Venture into the heart of an enchanted forest..."
            className="m-0 h-full"
            {...register("description")}
            state={errors?.description ? "error" : undefined}
            errorMessage={errors?.description?.message}
          />
        </div>
        <div className="flex min-h-0 md:basis-1/3 md:h-full">
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
      <div className="flex flex-row justify-end gap-8">
        <Button className="w-fit" variant="ghost" onClick={onCancel} type="reset">
          CANCEL
        </Button>
        <Button className="whitespace-nowrap w-fit px-8" variant="outline">
          {status === "CREATING" ? "ADD LOCATION" : "EDIT LOCATION"}
        </Button>
      </div>
      <DevTool control={control} id={`location-${editIndex}-form`} />
    </form>
  );
};

export default Location;
