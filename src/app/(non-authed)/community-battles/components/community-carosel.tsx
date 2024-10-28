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
          className="mb-4 h-32 w-32 rounded-full shadow-lg"
        />

        <div className="flex flex-row items-center gap-4">
          <h2 className="text-3xl font-extrabold text-red-200 drop-shadow-lg">
            {currentCommunity.name}
          </h2>
          {/* Social Media Icons */}
          <div className="flex flex-row gap-2">
            <a href={currentCommunity.twitterUrl} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="h-10 w-10 transform text-blue-500 transition-transform hover:scale-110 hover:text-blue-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Prize and Token */}
      <div className="mt-6 flex w-full justify-center">
        <p className="text-center text-5xl font-bold text-yellow-200">
          🎁 {currentCommunity.prize} {currentCommunity.prizeToken}
        </p>
      </div>

      {/* Community Description */}
      <div className="mt-6 flex w-full items-center justify-center text-center">
        <p className="text-xl text-gray-300">📜 {currentCommunity.description}</p>
      </div>
    </div>
  );
};

export default CommunityCarousel;
