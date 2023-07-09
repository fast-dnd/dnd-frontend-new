import { cn } from "@/utils/style-utils";
import React from "react";

interface ISkeletonProps {
  amount?: number;
  small?: boolean;
}

const Skeleton = ({ amount = 1, small = false }: ISkeletonProps) => {
  return (
    <>
      {Array.from({ length: amount }, (_, i) => (
        <div
          key={i}
          role="status"
          className="space-y-8 animate-pulse lg:space-y-0 lg:space-x-8 lg:flex lg:items-center"
        >
          <div
            className={cn(
              "flex items-center justify-center w-full h-48 rounded lg:w-96 bg-gray-600",
              small && "h-20 w-20 lg:w-28",
            )}
          >
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full">
            <div className={cn("h-2.5 rounded-full bg-gray-600 w-48 mb-4", small && "w-36")} />
            <div className="h-2 rounded-full bg-gray-600 max-w-[480px] mb-2.5" />
            <div className="h-2 rounded-full bg-gray-600 mb-2.5" />
            <div className="h-2 rounded-full bg-gray-600 max-w-[440px] mb-2.5" />
            <div className="h-2 rounded-full bg-gray-600 max-w-[460px] mb-2.5" />
            <div className="h-2 rounded-full bg-gray-600 max-w-[360px]" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
