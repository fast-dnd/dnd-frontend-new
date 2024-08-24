/* eslint-disable @next/next/no-img-element */
import React from "react";

interface CommunityLeaderboardProps {
  communities: Array<any>;
}

const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({ communities }) => {
  return (
    <div className="relative flex flex-col items-center bg-white/5 p-6">
      <p className="mb-4 text-4xl font-bold tracking-wide">Community Leaderboard</p>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto text-left text-white">
          <thead className="bg-gray-800 text-gold">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Logo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community, index) => (
              <tr key={community._id} className="bg-gray-700 hover:bg-gray-600">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={community.logoImageUrl}
                    alt={community.name}
                    className="h-12 w-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{community.name}</td>
                <td className="px-4 py-2">{community.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;
