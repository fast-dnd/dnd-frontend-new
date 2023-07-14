import React from "react";
import { DevTool } from "@hookform/devtools";
import { Control } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { StatusType } from "../stores/form-store";

interface IChampionLocationWrapperProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  status: StatusType;
  title: string;
  description: string;
  submitButtonText: string;
  formId: string;
  children: React.ReactNode;
  locationOrChampion: "Location" | "Champion";
  control: Control<any>;
}

const ChampionLocationWrapper = ({
  onSubmit,
  onCancel,
  status,
  description,
  formId,
  children,
  locationOrChampion,
  control,
}: IChampionLocationWrapperProps) => {
  return (
    <form className="flex h-full flex-col gap-8 lg:w-full" onSubmit={onSubmit}>
      <p className="-my-1 text-xl font-semibold uppercase tracking-[0.07em] text-white/50">
        {status === "CREATING" ? `Create ${locationOrChampion}` : `Edit ${locationOrChampion}`}
      </p>
      {description && (
        <p className="-my-1 text-lg tracking-[0.07em] text-white/50">{description}</p>
      )}
      <div className="flex h-full flex-col gap-5 lg:flex-row lg:gap-8">{children}</div>
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
      <DevTool control={control} id={formId} />
    </form>
  );
};

export default ChampionLocationWrapper;
