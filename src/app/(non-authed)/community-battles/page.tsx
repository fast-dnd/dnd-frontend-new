/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

// import Tournament from "./components/tournament";

const Leaderboard = () => {
  const router = useRouter();
  return (
    <>
      {
        /* <Tournament /> */
        <img src="/images/fft-soon.png" alt="ora logo" style={{ objectFit: "contain" }} />
      }
    </>
  );
};

export default Leaderboard;
