/* eslint-disable @next/next/no-img-element */
import React from "react";

import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

interface CommunityLeaderboardProps {
  communities: Array<any>;
}

const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({ communities }) => {
  return (
    <div className={cn("glass-effect-2", "relative flex flex-col items-center rounded-lg p-6")}>
      <p
        className="mb-3 text-center text-3xl font-bold text-red-400"
        style={{ fontFamily: jibril.style.fontFamily }}
      >
        Community Leaderboard
      </p>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto text-left text-white">
          <thead className="">
            <tr>
              <th className="px-4 py-2 font-bold uppercase">Rank</th>
              <th className="px-4 py-2 font-bold uppercase">Logo</th>
              <th className="px-4 py-2 font-bold uppercase">Name</th>
              <th className="px-4 py-2 font-bold uppercase">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community, index) => (
              <tr key={community._id} className="border-b border-gray-700">
                <td className="px-4 py-2 text-xl font-semibold">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={community.logoImageUrl}
                    alt={community.name}
                    className="h-12 w-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 text-lg">{community.name}</td>
                <td className="px-4 py-2 text-lg font-semibold">{community.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;
