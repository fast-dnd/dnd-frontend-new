import { FormEventHandler, useState } from "react";
import { IoMdSend } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/style-utils";

import useAskQuestion from "../../hooks/use-ask-question";

interface IAskQuestionProps {
  conversationId: string;
  canAsk: boolean;
  asking: boolean;
  setAsking: React.Dispatch<React.SetStateAction<boolean>>;
}

const AskQuestion = ({ conversationId, canAsk, asking, setAsking }: IAskQuestionProps) => {
  const { mutate: askQuestion } = useAskQuestion();
  const [question, setQuestion] = useState("");
  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    setAsking(true);
    setQuestion("");
    askQuestion({ conversationId, question }, { onError: () => setAsking(false) });
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-end">
      <div className="flex flex-1">
        <Input
          disabled={!canAsk}
          label="Ask Bob"
          value={question}
          className="m-0 flex-1"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </div>
      <Button
        disabled={!canAsk || !question}
        type="submit"
        variant="ghost"
        className={cn("flex w-fit items-center justify-center pr-0 text-primary", asking && "pb-5")}
        isLoading={asking}
        aria-label="Send"
      >
        {!asking && <IoMdSend className="h-10 w-10" />}
      </Button>
    </form>
  );
};

export default AskQuestion;
