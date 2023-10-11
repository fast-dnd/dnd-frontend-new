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
      locationOrChampion="Champion"
    >
      {({ register, errors }) => {
        const championErrors = errors as FieldErrors<IChampionSchema>;

        return (
          <>
            <div className="w-full">
              <Input
                label="Champion name"
                placeholder="Warrior"
                className="m-0"
                {...register("name")}
                state={championErrors?.name ? "error" : undefined}
                errorMessage={championErrors?.name?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Heal action text"
                placeholder="Try to heal yourself"
                {...register("moveMapping.discover_health")}
                state={championErrors?.moveMapping?.discover_health ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.discover_health?.message}
              />
              <Input
                label="Team action text"
                placeholder="Explore the location"
                {...register("moveMapping.conversation_with_team")}
                state={championErrors?.moveMapping?.conversation_with_team ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.conversation_with_team?.message}
              />
              <Input
                label="Mana action text"
                placeholder="Try to find something useful"
                {...register("moveMapping.discover_mana")}
                state={championErrors?.moveMapping?.discover_mana ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.discover_mana?.message}
              />
              <Input
                label="Rest action text"
                placeholder="Take a rest"
                {...register("moveMapping.rest")}
                state={championErrors?.moveMapping?.rest ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.rest?.message}
              />
            </div>

            <div className="flex min-h-0 lg:h-full">
              <TextArea
                label="Champion description"
                placeholder="You are a brave warrior ready to fight..."
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
