"use client";

import { Dispatch, SetStateAction } from "react";
import { FieldErrors } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";

import { ILocationSchema } from "../schemas/location-schema";
import ChampionLocationWrapper from "./champion-location-wrapper";

interface ILocationProps {
  status: "LIST" | "CREATING" | "EDITING";
  setStatus: Dispatch<SetStateAction<"LIST" | "CREATING" | "EDITING">>;
  editIndex: number;
  setEditIndex: Dispatch<SetStateAction<number>>;
}

const Location = ({ status, setStatus, editIndex, setEditIndex }: ILocationProps) => {
  return (
    <ChampionLocationWrapper
      status={status}
      setStatus={setStatus}
      editIndex={editIndex}
      setEditIndex={setEditIndex}
      locationOrChampion="Location"
    >
      {({ register, errors }) => {
        const locationErrors = errors as FieldErrors<ILocationSchema>;

        return (
          <>
            <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:basis-1/3 lg:gap-8">
              <Input
                label="Name"
                placeholder="Misty Forest"
                className="m-0"
                {...register("name")}
                state={locationErrors?.name ? "error" : undefined}
                errorMessage={locationErrors?.name?.message}
              />
              <div className="flex min-h-0 lg:h-full">
                <TextArea
                  label="Mission"
                  placeholder="The goal is to find the secret treasure hidden somewhere in the old castle..."
                  className="m-0 h-full"
                  {...register("mission")}
                  state={locationErrors?.mission ? "error" : undefined}
                  errorMessage={locationErrors?.mission?.message}
                />
              </div>
            </div>
            <div className="flex min-h-0 lg:h-full lg:basis-1/3">
              <TextArea
                label="Description"
                placeholder="Venture into the heart of an enchanted forest..."
                className="m-0 h-full"
                {...register("description")}
                state={locationErrors?.description ? "error" : undefined}
                errorMessage={locationErrors?.description?.message}
              />
            </div>
            <div className="flex min-h-0 lg:h-full lg:basis-1/3">
              <TextArea
                label="Transition"
                placeholder="You leave this place to enter the dark swamp..."
                className="m-0 h-full"
                {...register("transition")}
                state={locationErrors?.transition ? "error" : undefined}
                errorMessage={locationErrors?.transition?.message}
              />
            </div>
          </>
        );
      }}
    </ChampionLocationWrapper>
  );
};

export default Location;
