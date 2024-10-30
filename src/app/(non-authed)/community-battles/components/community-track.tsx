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
    <div className="relative flex flex-col items-center ">
      <div className="mt-2 flex space-x-6 overflow-x-auto px-6">
        {communities.map((community) => (
          <div
            key={community._id}
            className={`flex cursor-pointer flex-col items-center transition-transform ${
              selectedCommunity._id === community._id ? "shadow-lg shadow-blue-500/50" : ""
            }`}
            onClick={() => handleSelectCommunity(community)}
          >
            <img
              src={community.logoImageUrl}
              alt={community.name}
              className="mb-2 h-14 w-14 rounded-full hover:opacity-80 lg:h-32 lg:w-32"
            />
            <p className="text-lg text-white">{community.name}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-400">Click on community icon to view its leaderboard</p>
    </div>
  );
};

export default CommunityTrack;
