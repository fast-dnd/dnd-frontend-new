import React from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { championSchema, IChampionSchema } from "../schemas/champion-schema";
import { dungeonFormStore } from "../stores/dungeon-form-store";

export interface IChampionProps {
  editIndex: number;
  setEditIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface IChildrenProps {
  register: UseFormRegister<IChampionSchema>;
  errors: FieldErrors<IChampionSchema>;
}
interface IChampionWrapperProps extends IChampionProps {
  children: React.ReactNode | ((props: IChildrenProps) => React.ReactNode);
}

const ChampionWrapper = ({ children, editIndex, setEditIndex }: IChampionWrapperProps) => {
  const statusObs = dungeonFormStore.status;
  const status = statusObs.use();

  const dungeonFormField = "champions";

  const chmpData = dungeonFormStore.dungeonFormData[dungeonFormField][editIndex].use();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IChampionSchema>({
    resolver: zodResolver(championSchema),
    values: status === "EDITING" ? chmpData : undefined,
  });

  const onSubmit: SubmitHandler<IChampionSchema> = (data) => {
    if (status === "CREATING") {
      dungeonFormStore.dungeonFormData.champions.set((prev) => [
        ...prev,
        { ...data, _id: "", type: "standard" },
      ]);
    } else if (status === "EDITING") {
      const _id = chmpData._id;
      dungeonFormStore.dungeonFormData.champions[editIndex].set({
        ...data,
        _id,
        type: "standard",
      });
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
          {status === "CREATING" ? `ADD CHARACTER` : `EDIT CHARACTER`}
        </Button>
      </div>
      <DevTool control={control} id={`CHARACTER-${editIndex}-form`} />
    </form>
  );
};

export default ChampionWrapper;
