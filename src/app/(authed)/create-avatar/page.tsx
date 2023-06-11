"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadImage from "@/components/ui/upload-image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import useCreateAvatar from "./hooks/use-create-avatar";
import { DevTool } from "@hookform/devtools";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAvatarSchema, avatarSchema } from "./schemas/avatar-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileToBase64 } from "@/utils/b64";

const CreateAvatar = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IAvatarSchema>({
    resolver: zodResolver(avatarSchema),
  });

  const image = watch("image");
  const imageRef = useRef<HTMLInputElement>(null);

  const { mutate: createAvatar, isLoading } = useCreateAvatar();

  const onSubmit: SubmitHandler<IAvatarSchema> = (data) => {
    createAvatar(data);
  };

  const addImage = () => {
    imageRef.current?.click();
    imageRef.current?.addEventListener("change", async (e) => {
      setValue("image", (await fileToBase64((e.target as HTMLInputElement).files?.[0])) as string);
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-16">
      <Link
        className="flex gap-1 items-center font-medium tracking-[0.08em] uppercase"
        href="/home"
      >
        <AiOutlineLeft className="inline-block" /> GO BACK
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="CREATE AVATAR" className="flex flex-row gap-8 p-8">
          <UploadImage image={image} inputFile={imageRef} onClick={addImage} />
          <div className="flex flex-col gap-12 justify-center w-96">
            <Input
              label="Your avatar's name"
              placeholder="Thorian Blackthorn"
              className="text-xl tracking-[0.07em]"
              {...register("name")}
              state={errors?.name ? "error" : undefined}
              errorMessage={errors?.name?.message}
            />
            <Button isLoading={isLoading}>CREATE</Button>
          </div>
        </Box>
      </form>
      <DevTool control={control} id="avatar-form" />
    </div>
  );
};

export default CreateAvatar;
