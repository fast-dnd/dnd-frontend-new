import { FieldErrors } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";

import { ILocationSchema } from "../schemas/location-schema";
import LocationWrapper, { ILocationProps } from "./location-wrapper";

const Location = ({ editIndex, setEditIndex }: ILocationProps) => {
  return (
    <LocationWrapper editIndex={editIndex} setEditIndex={setEditIndex}>
      {({ register, errors }) => {
        const locationErrors = errors as FieldErrors<ILocationSchema>;

        return (
          <>
            <div className="w-full">
              <Input
                label="Scene title"
                placeholder="Enter a memorable name for this scene... e.g., 'The Enchanted Forest'"
                className="m-0 w-full"
                {...register("name")}
                state={locationErrors?.name ? "error" : undefined}
                errorMessage={locationErrors?.name?.message}
              />
            </div>
            <div className="flex h-full flex-row gap-6">
              <TextArea
                label="Scene description"
                placeholder="Describe this scene in detail... e.g., 'A mysterious forest filled with towering, ancient trees and bio-luminescent flora that bathes the forest floor in an eerie, ethereal glow...'"
                className="m-0 h-full"
                {...register("description")}
                state={locationErrors?.description ? "error" : undefined}
                errorMessage={locationErrors?.description?.message}
              />
              <TextArea
                label="Note for players"
                placeholder="What's the main objective in this scene. How you intend them to behave? e.g., 'Recover the lost magical orb'"
                className="m-0 h-full"
                {...register("mission")}
                state={locationErrors?.mission ? "error" : undefined}
                errorMessage={locationErrors?.mission?.message}
              />
            </div>
          </>
        );
      }}
    </LocationWrapper>
  );
};

export default Location;
