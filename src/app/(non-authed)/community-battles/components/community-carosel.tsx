/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaTwitter } from "react-icons/fa";

interface CommunityCarouselProps {
  selectedCommunity: any;
}

const CommunityCarousel: React.FC<CommunityCarouselProps> = ({ selectedCommunity }) => {
  const currentCommunity = selectedCommunity;
  if (!currentCommunity) {
    return null;
  }
  return (
    <div
      className="flex w-full flex-col items-center rounded-lg p-4"
      style={{
        // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%230e0344' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%231c0f51' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%232a1a5d' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%2337256a' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23443077' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Community Image and Name */}
      <div className="flex w-full flex-col items-center">
        <img
          src={currentCommunity.cardImageUrl}
          alt={currentCommunity.name}
          className="mb-2 h-32 w-32"
        />

        <div className="flex flex-row items-center gap-4">
          <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
            {currentCommunity.name}
          </h2>
          {/* Social Media Icons */}
          <div className="flex flex-row gap-2">
            <a href={currentCommunity.twitterUrl} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="bg-blue h-10 w-10 text-white hover:text-blue-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Prize and Token */}
      <div className="mt-4 flex w-full justify-center">
        <p className="font-mono text-4xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
          Prize: {currentCommunity.prize} {currentCommunity.prizeToken}
        </p>
      </div>

      {/* Community Description */}
      <div className="mt-4 flex w-full items-center justify-center text-center">
        <p className="text-xl text-white">{currentCommunity.description}</p>
      </div>
    </div>
  );
};

export default CommunityCarousel;
