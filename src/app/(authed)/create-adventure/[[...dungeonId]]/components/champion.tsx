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
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Heal action"
                placeholder="e.g., 'Heals through a mystical aura.'"
                {...register("moveMapping.discover_health")}
                state={championErrors?.moveMapping?.discover_health ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.discover_health?.message}
              />
              <Input
                label="Team action"
                placeholder="e.g., 'Inspires through courageous words.'"
                {...register("moveMapping.conversation_with_team")}
                state={championErrors?.moveMapping?.conversation_with_team ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.conversation_with_team?.message}
              />
              <Input
                label="Mana action"
                placeholder="e.g., 'Channels cosmic energy.'"
                {...register("moveMapping.discover_mana")}
                state={championErrors?.moveMapping?.discover_mana ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.discover_mana?.message}
              />
              <Input
                label="Rest action"
                placeholder="e.g., 'Meditates under the stars.'"
                {...register("moveMapping.rest")}
                state={championErrors?.moveMapping?.rest ? "error" : undefined}
                errorMessage={championErrors?.moveMapping?.rest?.message}
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
