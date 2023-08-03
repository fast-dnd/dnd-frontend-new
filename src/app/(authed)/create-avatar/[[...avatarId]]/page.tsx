"use client";

import { useRef } from "react";
import Link from "next/link";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLeft } from "react-icons/ai";

import { fileToBase64 } from "@/utils/b64";
import useGetAvatar from "@/hooks/use-get-avatar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadImage from "@/components/ui/upload-image";
import BoxSkeleton from "@/components/box-skeleton";
import MobileNavbar from "@/components/mobile-navbar";

import useCreateAvatar from "./hooks/use-create-avatar";
import useUpdateAvatar from "./hooks/use-update-avatar";
import { avatarSchema, IAvatarSchema } from "./schemas/avatar-schema";

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
    <div className="mt-8 flex flex-col items-center gap-8">
      <MobileNavbar />
      <Link
        className="hidden items-center gap-1 text-lg font-medium uppercase tracking-[0.08em] lg:flex"
        href="/home"
      >
        <AiOutlineLeft className="inline-block" /> GO BACK
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="px-5 lg:min-w-fit lg:px-0">
        <Box
          title={avatarId ? "EDIT AVATAR" : "CREATE AVATAR"}
          className="flex flex-col items-center gap-5 p-5 lg:flex-row lg:gap-8 lg:p-8"
        >
          <UploadImage
            image={image}
            inputFile={imageRef}
            onClick={addImage}
            defaultImage={avatarQuery?.data?.imageUrl || "/images/default-avatar.png"}
          />
          <div className="flex w-80 flex-col justify-center gap-6 lg:w-96 lg:gap-12">
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
