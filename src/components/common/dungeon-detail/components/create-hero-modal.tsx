import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";
import { useLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IChampion } from "@/types/dungeon";
import { jibril } from "@/utils/fonts";

import useUpdateRole from "@/app/(authed)/room/[conversationId]/hooks/use-update-role";

import { createHeroSchema, ICreateHeroSchema } from "../schemas/create-hero-schema";

const CreateHeroModal = ({
  conversationId,
  takenChampions,
  onChangeChampion,
  selectedChampion,
}: {
  conversationId: string;
  takenChampions?: IChampion[];
  onChangeChampion?: (champion: IChampion) => void;
  selectedChampion?: IChampion | undefined;
}) => {
  const isTaken = (champion: IChampion) =>
    takenChampions?.some((champ) => champ._id === champion._id) ?? false;

  const [open, setOpen] = useState(false);

  const [customChampion, setCustomChampion] = useLocalStorage<IChampion | null>(
    "customChampion",
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateHeroSchema>({
    resolver: zodResolver(createHeroSchema),
    defaultValues: customChampion ?? undefined,
  });

  const { mutate: createHero, isLoading } = useUpdateRole();

  const onSubmit: SubmitHandler<ICreateHeroSchema> = (data) =>
    createHero(
      { conversationId, customChampion: data },
      {
        onSuccess: (respData) => {
          setCustomChampion(respData as IChampion);
          setOpen(false);
        },
      },
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="lg:space-x-4">
        {customChampion && (
          <button
            className="rounded-lg  bg-white px-6 py-3 font-semibold text-black transition-all duration-200 max-lg:hidden"
            disabled={isTaken(customChampion)}
            onClick={() => onChangeChampion?.(customChampion)}
          >
            {isTaken(customChampion)
              ? "TAKEN"
              : customChampion._id === selectedChampion?._id
              ? "SELECTED"
              : "SELECT THIS CHARACTER"}
          </button>
        )}

        <DialogTrigger asChild>
          {customChampion ? (
            <button className="border-white bg-white px-4 py-3 font-semibold text-black transition-all duration-200 hover:bg-white hover:text-black max-lg:h-full max-lg:rounded-bl-md lg:rounded-lg lg:border-2 lg:bg-transparent lg:px-6 lg:text-white">
              EDIT <span className="max-lg:hidden">HERO</span>
            </button>
          ) : (
            <Button variant="primary" className="w-fit gap-2 max-lg:w-full max-lg:rounded-t-none">
              <PlusCircle />
              CREATE YOUR OWN HERO
            </Button>
          )}
        </DialogTrigger>
      </div>
      <DialogContent className="z-[100] flex flex-col gap-12 bg-black p-4 max-lg:size-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900/90 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end lg:hidden">
            <DialogClose>
              <AiOutlineClose />
            </DialogClose>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-center uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              CREATE YOUR OWN HERO
            </p>
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
          </div>
        </div>

        <form
          className="flex w-full flex-col gap-2 px-3 max-lg:overflow-y-auto lg:gap-4 lg:px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            className="p-2"
            label="Character Name"
            placeholder="e.g. “Chieftain Olaf”, “Princess Maya”..."
            {...register("name")}
            state={errors?.name ? "error" : undefined}
            errorMessage={errors?.name?.message}
          />
          <Input
            className="mb-6 p-2"
            label="Character Description"
            placeholder="What is the character like? Their traits..."
            {...register("description")}
            state={errors?.description ? "error" : undefined}
            errorMessage={errors?.description?.message}
          />
          <div className="h-0.5 w-full bg-black shadow-lobby" />

          <Input
            className="p-2"
            label="Heal Action"
            placeholder="How will the hero be healed..."
            {...register("moveMapping.discover_health")}
            StartIcon={AiFillHeart}
            startIconProps={{ className: "text-[#FF5A5A]" }}
            state={errors?.moveMapping?.discover_health ? "error" : undefined}
            errorMessage={errors?.moveMapping?.discover_health?.message}
          />
          <Input
            className="p-2"
            label="Mana Action"
            placeholder="A skill unique to the hero..."
            {...register("moveMapping.discover_mana")}
            StartIcon={HiSparkles}
            startIconProps={{ className: "text-[#71CCFF]" }}
            state={errors?.moveMapping?.discover_mana ? "error" : undefined}
            errorMessage={errors?.moveMapping?.discover_mana?.message}
          />
          <Input
            className="p-2"
            label="Round Bonus Action"
            placeholder="A skill that helps the team..."
            {...register("moveMapping.conversation_with_team")}
            StartIcon={GoPeople}
            startIconProps={{ className: "text-[#93DA87]" }}
            state={errors?.moveMapping?.conversation_with_team ? "error" : undefined}
            errorMessage={errors?.moveMapping?.conversation_with_team?.message}
          />
          <Input
            className="p-2"
            label="Rest Action"
            placeholder="Let the hero energize..."
            {...register("moveMapping.rest")}
            StartIcon={GiNightSleep}
            startIconProps={{ className: "text-[#D58CE1]" }}
            state={errors?.moveMapping?.rest ? "error" : undefined}
            errorMessage={errors?.moveMapping?.rest?.message}
          />

          <div className="flex max-lg:pb-4">
            <Button isLoading={isLoading}>ADD NEW HERO</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHeroModal;
