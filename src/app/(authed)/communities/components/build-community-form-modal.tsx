import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { jibril } from "@/utils/fonts";

import useBuildCommunity from "../hooks/use-build-community";
import { buildCommunitySchema, IBuildCommunitySchema } from "../schemas/build-community-schema";

const BuildCommunityFormModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBuildCommunitySchema>({
    resolver: zodResolver(buildCommunitySchema),
  });

  const { mutate: buildCommunity, isLoading } = useBuildCommunity();

  const onSubmit: SubmitHandler<IBuildCommunitySchema> = (data) => buildCommunity(data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="google" className="w-full py-2 uppercase lg:py-5">
          BUILD&nbsp;<span className="max-lg:hidden">YOUR&nbsp;</span>COMMUNITY
        </Button>
      </DialogTrigger>
      <DialogContent className="mt-8 flex flex-col gap-6 bg-black p-4 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:mt-0 lg:gap-12 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="mt-4 flex lg:hidden">
            <p>BUILD COMMUNITY</p>
          </div>
          <div className="hidden items-center justify-center gap-4 lg:flex">
            <div className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-lg uppercase tracking-widest lg:text-3xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              BUILD COMMUNITY
            </p>
            <div className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Name"
              placeholder="Enter your name..."
              {...register("name")}
              state={errors?.name ? "error" : undefined}
              errorMessage={errors?.name?.message}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email..."
              {...register("email")}
              state={errors?.email ? "error" : undefined}
              errorMessage={errors?.email?.message}
            />
            <TextArea
              label="Message"
              placeholder="Tell us details about your Web3 community and how it could benefit from v3RPG..."
              {...register("message")}
              state={errors?.message ? "error" : undefined}
              errorMessage={errors?.message?.message}
              rows={3}
            />

            <div className="flex items-center justify-center">
              <Button className="lg:w-fit" isLoading={isLoading}>
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuildCommunityFormModal;
