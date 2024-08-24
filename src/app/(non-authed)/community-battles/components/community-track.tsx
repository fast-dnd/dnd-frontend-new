/* eslint-disable @next/next/no-img-element */
import React from "react";

interface CommunityTrackProps {
  communities: Array<any>;
  selectedCommunity: any;
  handleSelectCommunity: (community: any) => void;
}

const CommunityTrack: React.FC<CommunityTrackProps> = ({
  communities,
  selectedCommunity,
  handleSelectCommunity,
}) => {
  if (!selectedCommunity) {
    return null;
  }
  return (
    <div className="relative flex flex-col items-center p-6">
      <p className="mb-4 text-4xl font-bold tracking-wide text-gold">Communities</p>
      <div className="mt-2 flex space-x-6 overflow-x-auto">
        {communities.map((community) => (
          <div
            key={community._id}
            // className="flex cursor-pointer flex-col items-center"
            className={`flex cursor-pointer flex-col items-center ${
              selectedCommunity._id === community._id ? "animate-pulse" : ""
            }`}
            onClick={() => handleSelectCommunity(community)}
          >
            <img
              src={community.logoImageUrl}
              alt={community.name}
              className="mb-2 h-32 w-32 rounded-full hover:opacity-80"
            />
            <p className="text-lg text-white">{community.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityTrack;
