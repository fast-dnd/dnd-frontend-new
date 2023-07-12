import React from "react";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

import MobileNavbar from "@/components/mobile-navbar";

import JoinEditInfo from "./components/join-edit-info";
import RoomInfo from "./components/room-info";

const Room = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;

  return (
    <div className="mt-8 h-full min-h-0 w-full overflow-y-auto lg:mt-0">
      <MobileNavbar />
      <div className="flex h-full justify-center pt-8 lg:overflow-y-hidden lg:p-16">
        <div className="flex flex-col items-center gap-8">
          <Link
            className="hidden items-center gap-1 font-medium uppercase tracking-[0.08em] lg:flex"
            href="/home"
          >
            <AiOutlineLeft className="inline-block" /> GO BACK
          </Link>
          <div className="flex min-h-0 w-full flex-1 flex-col gap-12 lg:flex-row">
            <RoomInfo conversationId={conversationId} />
            <JoinEditInfo conversationId={conversationId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
