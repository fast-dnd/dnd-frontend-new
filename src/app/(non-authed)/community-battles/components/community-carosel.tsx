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
          className="mb-4 h-24 w-24 rounded-full shadow-lg sm:h-32 sm:w-32"
        />

        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <h2 className="text-2xl font-extrabold text-red-200 drop-shadow-lg sm:text-3xl">
            {currentCommunity.name}
          </h2>
          {/* Social Media Icons */}
          <div className="flex flex-row gap-1 sm:gap-2">
            <a href={currentCommunity.twitterUrl} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="h-8 w-8 transform text-blue-500 transition-transform hover:scale-110 hover:text-blue-400 sm:h-10 sm:w-10" />
            </a>
          </div>
        </div>
      </div>

      {/* Prize and Token */}
      <div className="mt-4 flex w-full justify-center sm:mt-6">
        <p className="text-center text-4xl font-bold text-yellow-200 sm:text-5xl">
          🎁 {currentCommunity.prize} {currentCommunity.prizeToken}
        </p>
      </div>

      {/* Community Description */}
      <div className="mt-4 flex w-full items-center justify-center text-center sm:mt-6">
        <p className="text-lg text-gray-300 sm:text-xl">📜 {currentCommunity.description}</p>
      </div>
    </div>
  );
};

export default CommunityCarousel;
