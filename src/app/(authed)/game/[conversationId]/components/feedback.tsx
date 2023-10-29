import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLeft } from "react-icons/ai";
import { z } from "zod";

import MobileNavbar from "@/components/mobile-navbar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";

import useSendFeedback from "../hooks/use-send-feedback";
import { gameStore } from "../stores/game-store";

const Feedback = () => {
  const feedbackSchema = z.object({
    text: z.string().nonempty("Please enter your feedback"),
  });
  type FeedbackSchema = z.infer<typeof feedbackSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
  });

  const { mutate: sendFeedback, isLoading } = useSendFeedback();

  const onSendFeedback: SubmitHandler<FeedbackSchema> = (data) => {
    sendFeedback({ ...data }, { onSuccess: () => reset() });
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-8 overflow-hidden px-5 pb-8">
      <MobileNavbar />
      <div
        className="hidden cursor-pointer items-center gap-1 text-lg font-medium uppercase tracking-[0.08em] lg:flex"
        onClick={() => gameStore.pageState.set("DEFAULT")}
      >
        <AiOutlineLeft className="inline-block" /> BACK TO THE GAME
      </div>
      <div className="flex min-h-0 w-full shrink grow-0 lg:w-fit">
        <Box
          title="FEEDBACK"
          className="flex h-full items-start justify-center overflow-y-auto p-5 tracking-wider lg:px-12 lg:py-8"
          wrapperClassName="h-full"
        >
          <form
            className="flex w-full flex-col gap-5 lg:w-[768px] lg:gap-12"
            onSubmit={handleSubmit(onSendFeedback)}
          >
            <p className="w-fit font-semibold uppercase leading-7 tracking-widest lg:text-lg">
              HELP US IMPROVE THE GAME
            </p>
            <ul className="ml-8 list-disc">
              {["Inform a problem", "Suggest something to improve", "Tell us what you liked"].map(
                (item, index) => (
                  <li key={index} className="leading-8 tracking-wider lg:text-lg">
                    {item}
                  </li>
                ),
              )}
            </ul>
            <TextArea
              placeholder="What I think about V3RPG..."
              className="h-24 leading-7 tracking-widest lg:h-56 lg:text-xl"
              {...register("text")}
              state={errors?.text ? "error" : undefined}
              errorMessage={errors?.text?.message}
            />
            <div className="flex justify-end">
              <Button className="w-fit px-8 py-2" isLoading={isLoading}>
                SEND
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Feedback;
