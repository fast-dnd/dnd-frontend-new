import Image from "next/image";

import { ITranscriptStory } from "@/types/transcript";

const ChatWithMaster = ({ story }: { story: ITranscriptStory }) => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <p className="text-xl font-medium">CHAT WITH MASTER</p>
      <p className="inline-flex gap-4">
        <Image
          src={story.playerAsking?.imageUrl || "/images/default-avatar.png"}
          width={32}
          height={32}
          alt={`avatar`}
          className="rounded-md"
        />
        <span className="font-semibold text-primary">{story.playerAsking?.name}:</span>{" "}
        {story.question}
      </p>
      <p className="inline-flex gap-4">
        <Image
          src={"/images/master-avatar.jpg"}
          width={32}
          height={32}
          alt={`master avatar`}
          className="rounded-md"
        />
        <span className="font-semibold">MASTER:</span> {story.answer}
      </p>
    </div>
  );
};

export default ChatWithMaster;
