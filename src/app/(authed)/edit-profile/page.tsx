"use client";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import GoBackButton from "@/components/go-back-button";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadImage from "@/components/ui/upload-image";
import useGetAccount from "@/hooks/use-get-account";

import useEditProfile from "./hooks/use-edit-profile";
import { editProfileSchema, IEditProfileSchema } from "./schemas/edit-profile-schema";

const EditProfile = () => {
  const { data: account, isLoading } = useGetAccount();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    values: account?.account,
  });

  const image = watch("image");

  const { mutate: editProfile, isLoading: isEditing } = useEditProfile();

  const onSubmit: SubmitHandler<IEditProfileSchema> = (data) => {
    editProfile(data);
  };

  if (isLoading) return <EditProfileSkeleton />;

  if (!account) return <div>Something went wrong</div>;

  return (
    <div className="mt-8 flex flex-col items-center gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 lg:min-w-fit lg:px-0">
        <Box
          title="EDIT PROFILE"
          className="flex flex-col items-center gap-5 p-5 lg:flex-row lg:gap-8 lg:p-8"
        >
          <GoBackButton href="/profile" />
          <UploadImage
            image={image}
            defaultImage={account.account.imageUrl || "/images/default-avatar.png"}
            setImage={(image) => setValue("image", image)}
          />
          <div className="flex w-80 flex-col justify-center gap-6 lg:w-96 lg:gap-12">
            <Input
              label="Your profile's username"
              placeholder="Thorian Blackthorn"
              className="text-xl tracking-[0.07em]"
              {...register("username")}
              state={errors?.username ? "error" : undefined}
              errorMessage={errors?.username?.message}
            />
            <Button isLoading={isEditing}>UPDATE</Button>
          </div>
        </Box>
      </form>
      <DevTool control={control} id="edit-profile-form" />
    </div>
  );
};

export default EditProfile;

const EditProfileSkeleton = () => {
  return (
    <div className="mt-8 flex flex-col items-center gap-8">
      <div className="h-7 w-28 animate-pulse rounded-lg bg-gray-600" />
      <div className="lg:min-w-fit">
        <Box
          title="EDIT PROFILE"
          className="flex flex-col items-center gap-5 p-5 lg:flex-row lg:gap-8 lg:p-8"
        >
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
  );
};
