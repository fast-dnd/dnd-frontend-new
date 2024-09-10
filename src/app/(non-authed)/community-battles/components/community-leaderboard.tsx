/* eslint-disable @next/next/no-img-element */
import React from "react";

import { jibril } from "@/utils/fonts";

interface CommunityLeaderboardProps {
  communities: Array<any>;
}

const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({ communities }) => {
  return (
    <div
      style={{
        // backgroundColor: "#1c1c1c",
        padding: "24px",
        borderRadius: "10px",
        // boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      }}
      className="relative flex flex-col items-center"
    >
      <p
        style={{
          marginBottom: "12px",
          fontSize: "2rem",
          fontFamily: jibril.style.fontFamily,
          fontWeight: "bold",
          color: "gold",
          textAlign: "center",
        }}
      >
        Community Leaderboard
      </p>
      <div className="w-full overflow-x-auto">
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 0.5em",
          }}
          className="min-w-full table-auto text-left text-white"
        >
          <thead style={{ backgroundColor: "#252525" }}>
            <tr>
              <th style={{ padding: "16px", textTransform: "uppercase", fontWeight: 700 }}>Rank</th>
              <th style={{ padding: "16px", textTransform: "uppercase", fontWeight: 700 }}>Logo</th>
              <th style={{ padding: "16px", textTransform: "uppercase", fontWeight: 700 }}>Name</th>
              <th style={{ padding: "16px", textTransform: "uppercase", fontWeight: 700 }}>
                Engagement
              </th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community, index) => (
              <tr
                key={community._id}
                style={{
                  backgroundColor: "#2d2d2d",
                  transition: "background-color 0.3s ease",
                  borderRadius: "10px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2d2d2d")}
              >
                <td style={{ padding: "16px", fontSize: "1.25rem", fontWeight: "600" }}>
                  {index + 1}
                </td>
                <td style={{ padding: "16px" }}>
                  <img
                    src={community.logoImageUrl}
                    alt={community.name}
                    style={{
                      height: "48px",
                      width: "48px",
                      borderRadius: "50%",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </td>
                <td style={{ padding: "16px", fontSize: "1.1rem" }}>{community.name}</td>
                <td style={{ padding: "16px", fontSize: "1.1rem", fontWeight: "600" }}>
                  {community.engagement}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;
