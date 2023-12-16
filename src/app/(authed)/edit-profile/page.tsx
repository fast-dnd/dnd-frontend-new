"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";

import GoBackButton from "@/components/go-back-button";
import MobileNavbar from "@/components/navbar/mobile-navbar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadImage from "@/components/ui/upload-image";
import useAuth from "@/hooks/helpers/use-auth";
import { fileToBase64 } from "@/utils/b64";

import useEditProfile from "./hooks/use-edit-profile";
import { editProfileSchema, IEditProfileSchema } from "./schemas/edit-profile-schema";

const EditProfile = () => {
  const router = useRouter();

  const { loggingIn, user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  const image = watch("image");

  const imageRef = useRef<HTMLInputElement>(null);

  const { mutate: editProfile, isLoading: isEditing } = useEditProfile();

  const onSubmit: SubmitHandler<IEditProfileSchema> = (data) => {
    editProfile(data);
  };

  if (loggingIn) return <EditProfileSkeleton />;

  if (!user) return <div>Something went wrong</div>;

  const addImage = () => {
    imageRef.current?.click();
    imageRef.current?.addEventListener("change", async (e) => {
      setValue("image", (await fileToBase64((e.target as HTMLInputElement).files?.[0])) as string);
    });
  };

  return (
    <>
      <div className="mt-8 hidden flex-col items-center gap-8 lg:flex">
        <form onSubmit={handleSubmit(onSubmit)} className="px-5 lg:min-w-fit lg:px-0">
          <Box title="EDIT PROFILE" className="flex flex-col gap-5 p-5 lg:gap-8 lg:p-8">
            <GoBackButton href="/profile" />
            <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
              <UploadImage
                image={image}
                defaultImage={user?.account.imageUrl || "/images/default-avatar.png"}
                setImage={(image) => setValue("image", image)}
              />
              <div className="flex w-80 flex-col justify-center gap-6 lg:w-96 lg:gap-12">
                <Input
                  label="Your profile's username"
                  placeholder="Thorian Blackthorn"
                  className="text-xl tracking-[0.07em]"
                  defaultValue={user?.account.username}
                  onChange={(e) => setValue("username", e.target.value)}
                  state={errors?.username ? "error" : undefined}
                  errorMessage={errors?.username?.message}
                />
                <Button isLoading={isEditing}>UPDATE</Button>
              </div>
            </div>
          </Box>
        </form>
        <DevTool control={control} id="edit-profile-form" />
      </div>

      <div className="flex flex-1 flex-col items-center gap-8 lg:hidden">
        <MobileNavbar className="bg-neutral-900" onClickBack={() => router.push("/profile")} />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-1 px-5">
          <div className="flex h-full flex-1 flex-col gap-6">
            <p className="font-medium">EDIT PROFILE PHOTO</p>
            <div className="flex items-center gap-3">
              <Image
                src={image || user?.account.imageUrl || "/images/default-avatar.png"}
                alt="avatar"
                width={100}
                height={100}
                className="rounded-full"
              />
              <button
                className="flex items-center gap-2 whitespace-nowrap rounded-md border border-white px-4 py-3 text-sm font-bold"
                onClick={addImage}
                type="button"
              >
                <input type="file" ref={imageRef} className="hidden" accept="image/*" />
                <FiUpload />
                UPLOAD NEW PHOTO
              </button>
            </div>

            <div className="h-0.5 bg-black shadow-lobby" />

            <div className="flex flex-1 flex-col justify-start">
              <Input
                label="EDIT YOUR USERNAME"
                placeholder="Thorian Blackthorn"
                className="text-xl tracking-[0.07em]"
                defaultValue={user?.account.username}
                onChange={(e) => setValue("username", e.target.value)}
                state={errors?.username ? "error" : undefined}
                errorMessage={errors?.username?.message}
              />
            </div>
          </div>

          <div className="fixed bottom-4 left-0 flex w-full justify-center">
            <Button className="w-52" isLoading={isEditing}>
              SAVE CHANGES
            </Button>
          </div>
        </form>
      </div>

      <DevTool control={control} id="edit-profile-form" />
    </>
  );
};

export default EditProfile;

const EditProfileSkeleton = () => {
  return (
    <>
      <div className="mt-8 hidden flex-col items-center gap-8 lg:flex">
        <div className="lg:min-w-fit">
          <Box title="EDIT PROFILE" className="flex flex-col gap-5 p-5 lg:gap-8 lg:p-8">
            <div className="h-7 w-28 animate-pulse rounded-lg bg-gray-600" />

            <div className="flex animate-pulse gap-5 lg:gap-8">
              <div className="h-[170px] w-[170px] rounded-lg bg-gray-600" />
              <div className="flex flex-col gap-6 lg:gap-12">
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-40 rounded-lg bg-gray-600" />
                  <div className="h-14 w-96 rounded-lg bg-gray-600" />
                </div>
                <div className="h-14 w-96 rounded-lg bg-gray-600" />
              </div>
            </div>
          </Box>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-8 lg:hidden">
        <div className="fixed left-0 top-0 w-full">
          <MobileNavbar className="bg-neutral-900" />
          <div className="mt-4 flex-1 px-5">
            <div className="flex h-full flex-1 flex-col gap-6">
              <p className="font-medium">EDIT PROFILE PHOTO</p>
              <div className="flex items-center gap-3">
                <div className="h-[100px] w-[100px] rounded-full bg-gray-600" />

                <div className="flex items-center gap-2 whitespace-nowrap rounded-md border border-white px-4 py-3 text-sm font-bold">
                  <FiUpload />
                  UPLOAD NEW PHOTO
                </div>
              </div>

              <div className="h-0.5 bg-black shadow-lobby" />

              <div className="flex flex-1 flex-col justify-start">
                <p className="font-medium">EDIT YOUR USERNAME</p>
                <div className="h-14 w-full rounded-lg bg-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 left-0 flex w-full justify-center">
          <Button className="w-52">SAVE CHANGES</Button>
        </div>
      </div>
    </>
  );
};
