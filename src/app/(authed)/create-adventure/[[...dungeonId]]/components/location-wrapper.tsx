import React from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { ILocationSchema, locationSchema } from "../schemas/location-schema";
import { dungeonFormStore } from "../stores/dungeon-form-store";

export interface ILocationProps {
  editIndex: number;
  setEditIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface IChildrenProps {
  register: UseFormRegister<ILocationSchema>;
  errors: FieldErrors<ILocationSchema>;
}
interface ILocationWrapperProps extends ILocationProps {
  children: React.ReactNode | ((props: IChildrenProps) => React.ReactNode);
}

const LocationWrapper = ({ children, editIndex, setEditIndex }: ILocationWrapperProps) => {
  const statusObs = dungeonFormStore.status;
  const status = statusObs.use();

  const dungeonFormField = "locations";

  const locData = dungeonFormStore.dungeonFormData[dungeonFormField][editIndex].use();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ILocationSchema>({
    resolver: zodResolver(locationSchema),
    values: status === "EDITING" ? locData : undefined,
  });

  const onSubmit: SubmitHandler<ILocationSchema> = (data) => {
    if (status === "CREATING") {
      dungeonFormStore.dungeonFormData.locations.set((prev) => [...prev, { ...data, _id: "" }]);
    } else if (status === "EDITING") {
      const _id = locData._id;
      dungeonFormStore.dungeonFormData.locations[editIndex].set({ ...data, _id });
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
          {status === "CREATING" ? `ADD SCENE` : `EDIT SCENE`}
        </Button>
      </div>
      <DevTool control={control} id={`SCENE-${editIndex}-form`} />
    </form>
  );
};

export default LocationWrapper;
