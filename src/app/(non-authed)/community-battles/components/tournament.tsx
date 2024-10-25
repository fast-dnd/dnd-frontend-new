/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React from "react";

import MobileNavbar from "@/components/navbar/mobile-navbar";

import TournamentDesktop from "./tournament-desktop";

const Tournament = () => {
  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 pb-12 lg:flex lg:flex-row lg:px-0">
        <TournamentDesktop />
      </div>
      <div className="relative flex flex-col lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <TournamentDesktop />
      </div>
    </>
  );
};

export default Tournament;
