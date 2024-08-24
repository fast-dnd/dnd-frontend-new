/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

interface CommunityCarouselProps {
  selectedCommunity: any;
}

const CommunityCarousel: React.FC<CommunityCarouselProps> = ({ selectedCommunity }) => {
  const currentCommunity = selectedCommunity;
  if (!currentCommunity) {
    return null;
  }
  return (
    <div className="flex  w-full flex-col items-center  bg-white/5 p-4">
      {/* Community Image and Name */}
      <div className="flex w-full flex-col items-center">
        <img
          src={currentCommunity.cardImageUrl}
          alt={currentCommunity.name}
          className="mb-2 h-32 w-32"
        />
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-2xl font-bold text-white">{currentCommunity.name}</h2>
          {/* Social Media Icons */}
          <div className="flex flex-row gap-2">
            <a href={currentCommunity.instagramUrl} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="h-10 w-10 text-white hover:text-pink-500" />
            </a>
            <a href={currentCommunity.twitterUrl} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="h-10 w-10 text-white hover:text-blue-400" />
            </a>
          </div>
        </div>
      </div>
      {/* Prize and Token */}
      <div className="mt-4 flex w-full justify-center">
        <p className="text-2xl font-bold text-white">
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
