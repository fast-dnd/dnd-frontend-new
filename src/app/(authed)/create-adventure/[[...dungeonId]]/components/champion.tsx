import { FieldErrors } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";

import { IChampionSchema } from "../schemas/champion-schema";
import ChampionLocationWrapper, { IChampionLocationProps } from "./champion-location-wrapper";

const Champion = ({ editIndex, setEditIndex }: IChampionLocationProps) => {
  return (
    <ChampionLocationWrapper
      editIndex={editIndex}
      setEditIndex={setEditIndex}
      locationOrChampion="Character"
    >
      {({ register, errors }) => {
        const championErrors = errors as FieldErrors<IChampionSchema>;

        return (
          <>
            <div className="w-full">
              <Input
                label="Character name"
                placeholder="Enter your character's name... e.g., 'Eldric the Unyielding"
                className="m-0"
                {...register("name")}
                state={championErrors?.name ? "error" : undefined}
                errorMessage={championErrors?.name?.message}
              />
            </div>

            <div className="flex min-h-0 lg:h-full">
              <TextArea
                label="Character description"
                placeholder="Describe your character... e.g., 'Exiled warrior prince with steel-grey eyes...'"
                className="m-0 h-full"
                {...register("description")}
                state={championErrors?.description ? "error" : undefined}
                errorMessage={championErrors?.description?.message}
              />
            </div>
          </>
        );
      }}
    </ChampionLocationWrapper>
  );
};

export default Champion;
