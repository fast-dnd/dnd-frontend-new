import Link from "next/link";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import RoomInfo from "./components/room-info";
import JoinEditInfo from "./components/join-edit-info";

const Room = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;

  return (
    <div className="flex justify-center h-full p-16 pt-8 overflow-y-hidden">
      <div className="flex flex-col items-center gap-8">
        <Link
          className="flex gap-1 items-center font-medium tracking-[0.08em] uppercase"
          href="/home"
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </Link>
        <div className="flex flex-row flex-1 min-h-0 gap-12 w-full">
          <RoomInfo conversationId={conversationId} />
          <JoinEditInfo conversationId={conversationId} />
        </div>
      </div>
    </div>
  );
};

export default Room;
