"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadImage from "@/components/ui/upload-image";
import { fileToBase64 } from "@/utils/b64";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLeft } from "react-icons/ai";
import DungeonSkeleton from "../../create-dungeon/[[...dungeonId]]/components/dungeon-skeleton";
import useCreateAvatar from "./hooks/use-create-avatar";
import useUpdateAvatar from "./hooks/use-update-avatar";
import { IAvatarSchema, avatarSchema } from "./schemas/avatar-schema";
import useGetAvatar from "@/hooks/use-get-avatar";
import BoxSkeleton from "@/components/BoxSkeleton";

const CreateAvatar = ({ params }: { params: { avatarId?: [string] } }) => {
  const avatarId = params.avatarId?.[0];

  const avatarQuery = useGetAvatar(avatarId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IAvatarSchema>({
    resolver: zodResolver(avatarSchema),
    values: avatarQuery?.data,
  });

  const image = watch("image");
  const imageRef = useRef<HTMLInputElement>(null);

  const { mutate: createAvatar, isLoading: isCreating } = useCreateAvatar();
  const { mutate: updateAvatar, isLoading: isUpdating } = useUpdateAvatar();

  const onSubmit: SubmitHandler<IAvatarSchema> = (data) => {
    if (avatarId) updateAvatar({ ...data, avatarId });
    else createAvatar(data);
  };

  const addImage = () => {
    imageRef.current?.click();
    imageRef.current?.addEventListener("change", async (e) => {
      setValue("image", (await fileToBase64((e.target as HTMLInputElement).files?.[0])) as string);
    });
  };

  if (avatarQuery?.isInitialLoading)
    return <BoxSkeleton title={`${avatarId ? "EDIT" : "CREATE"} AVATAR`} />;

  return (
    <div className="flex flex-col items-center gap-8 mt-16">
      <Link
        className="flex gap-1 items-center font-medium tracking-[0.08em] uppercase"
        href="/home"
      >
        <AiOutlineLeft className="inline-block" /> GO BACK
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title={avatarId ? "EDIT AVATAR" : "CREATE AVATAR"} className="flex flex-row gap-8 p-8">
          <UploadImage
            image={image}
            inputFile={imageRef}
            onClick={addImage}
            defaultImage={avatarQuery?.data?.imageUrl || "/images/default-avatar.png"}
          />
          <div className="flex flex-col gap-12 justify-center w-96">
            <Input
              label="Your avatar's name"
              placeholder="Thorian Blackthorn"
              className="text-xl tracking-[0.07em]"
              {...register("name")}
              state={errors?.name ? "error" : undefined}
              errorMessage={errors?.name?.message}
            />
            <Button isLoading={isCreating || isUpdating}>{avatarId ? "UPDATE" : "CREATE"}</Button>
          </div>
        </Box>
      </form>
      <DevTool control={control} id="avatar-form" />
    </div>
  );
};

export default CreateAvatar;
