import { Box } from "@/components/ui/box";
import Link from "next/link";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import RoomInfo from "./components/room-info";
import JoinEditInfo from "./components/join-edit-info";

const Room = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;

  return (
    <div className="flex justify-center h-full p-16 overflow-y-hidden">
      <div className="flex flex-col gap-8">
        <Link
          className="cursor-pointer flex flex-row gap-1 font-medium items-center justify-center text-center w-full tracking-[0.08em] uppercase"
          href="/home"
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </Link>
        <div className="flex flex-row gap-12 w-full">
          <RoomInfo />
          <JoinEditInfo />
        </div>
      </div>
    </div>
  );
};

export default Room;
