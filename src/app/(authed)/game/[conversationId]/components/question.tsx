import { IQuestion } from "@/services/room-service";

const Question = ({ question }: { question: Partial<IQuestion> }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 px-4 py-2 bg-white/10">
        <p>
          <span className="font-semibold">{question.playerName}</span> asked:
        </p>
        <p>{question.question}</p>
      </div>
      {!!question.bob3Answer && (
        <div className="flex flex-col gap-2 px-4 py-2 bg-white/10">
          <p>
            <span className="font-semibold text-tomato">Bob</span> answered{" "}
            <span className="font-semibold">{question.playerName}</span>:
          </p>
          <p>{question.bob3Answer}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
