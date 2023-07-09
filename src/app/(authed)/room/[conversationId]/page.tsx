import Link from "next/link";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import RoomInfo from "./components/room-info";
import JoinEditInfo from "./components/join-edit-info";
import MobileNavbar from "@/components/mobile-navbar";

const Room = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;

  return (
    <div className="h-full w-full mt-8 lg:mt-0 overflow-y-auto">
      <MobileNavbar />
      <div className="flex justify-center h-full lg:p-16 pt-8 lg:overflow-y-hidden">
        <div className="flex flex-col items-center gap-8">
          <Link
            className="hidden lg:flex gap-1 items-center font-medium tracking-[0.08em] uppercase"
            href="/home"
          >
            <AiOutlineLeft className="inline-block" /> GO BACK
          </Link>
          <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-12 w-full">
            <RoomInfo conversationId={conversationId} />
            <JoinEditInfo conversationId={conversationId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
