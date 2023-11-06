import { FormEventHandler, useState } from "react";
import { IoMdSend } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAskQuestion from "../../hooks/use-ask-question";

const AskQuestion = ({
  conversationId,
  canAsk,
  asking,
  setAsking,
}: {
  conversationId: string;
  canAsk: boolean;
  asking: boolean;
  setAsking: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
          className="m-0"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </div>
      <Button
        disabled={!canAsk}
        type="submit"
        variant="ghost"
        className="h-[60px] w-[60px] items-center justify-center p-0 text-3xl text-primary"
        isLoading={asking}
        aria-label="Send"
      >
        {!asking && <IoMdSend />}
      </Button>
    </form>
  );
};

export default AskQuestion;
