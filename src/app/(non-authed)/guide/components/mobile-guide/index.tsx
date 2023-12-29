"use client";

import { useState } from "react";
import { useWindowSize } from "usehooks-ts";

import MobileSwiper from "@/components/common/mobile-swiper";

import Step from "./step";

const MobileGuide = () => {
  const { width } = useWindowSize();
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="relative flex flex-1 flex-col justify-end gap-6 overflow-hidden pt-6">
      <div className="absolute bottom-0 h-12 w-full bg-black" />
      <MobileSwiper
        arrayLength={10}
        itemWidth={width}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <Step key={i} stepIndex={i} />
        ))}
      </MobileSwiper>
      <div className="z-10 px-4 pb-3">
        <div className="h-3 w-full bg-white" />
      </div>
    </div>
  );
};

export default MobileGuide;
