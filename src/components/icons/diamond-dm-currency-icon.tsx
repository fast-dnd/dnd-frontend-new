import * as React from "react";
import { SVGProps } from "react";
import Image from "next/image";

const DiamondDMCurrencyIcon = (props: SVGProps<SVGSVGElement> & { image?: boolean }) => {
  // needed because svg doesn't display correctly on mobile
  if (props.image)
    return (
      <Image
        src="/images/illustration-diamond.png"
        width={17}
        height={18}
        alt="diamond dm currency icon"
      />
    );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={18}
      viewBox="0 0 17 18"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_221_2399)">
        <path
          d="M15.729 4.68955L8.50675 4.71076L1.28602 4.72928L0.123479 10.5658L8.77546 17.952L17.1275 10.517L15.729 4.68955Z"
          fill="url(#paint0_linear_221_2399)"
        />
        <g
          style={{
            mixBlendMode: "screen",
          }}
          opacity={0.5}
        >
          <path
            d="M4.92445 6.18403L3.69012 11.955L0.123732 10.5656L1.28627 4.72912L4.92445 6.18403Z"
            fill="#FF5A5A"
          />
        </g>
        <path
          d="M15.7318 4.69111L12.1492 6.16453L4.9242 6.18419L1.28449 4.73198L4.86582 3.2543L12.0908 3.23465L15.7318 4.69111Z"
          fill="url(#paint1_linear_221_2399)"
        />
        <g
          style={{
            mixBlendMode: "screen",
          }}
          opacity={0.35}
        >
          <path
            d="M12.149 6.16444L13.6165 11.9277L17.1273 10.5169L15.7288 4.68947L12.149 6.16444Z"
            fill="#FF5A5A"
          />
        </g>
        <path
          d="M3.68959 11.9555L13.7382 11.8798L8.77518 17.9524L3.68959 11.9555Z"
          fill="url(#paint2_linear_221_2399)"
        />
        <path
          d="M17.1273 10.5173L13.6074 11.8802L8.7753 17.9523L17.1273 10.5173Z"
          fill="url(#paint3_linear_221_2399)"
        />
        <g
          style={{
            mixBlendMode: "screen",
          }}
        >
          <path
            d="M0.123515 10.5657L3.6899 11.9551L8.7755 17.9519L3.87161 11.9547L13.6075 11.8798L3.83429 11.809L4.92424 6.1841L3.68433 11.7918L0.123515 10.5657Z"
            fill="#FF5A5A"
          />
        </g>
        <path
          style={{
            mixBlendMode: "screen",
          }}
          opacity={0.5}
          d="M15.7317 4.69114L12.1491 6.16456L7.30617 6.17703C10.3444 5.17123 10.0562 4.02585 9.26919 3.24216L12.088 3.23312L15.7317 4.69114Z"
          fill="url(#paint4_linear_221_2399)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_221_2399"
          x1={8.77208}
          y1={17.9608}
          x2={8.1904}
          y2={6.98991}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5A5A" />
          <stop offset={0.18} stopColor="#FF5A5A" />
          <stop offset={0.46875} stopColor="#C53333" />
          <stop offset={0.703125} stopColor="#FF6464" />
          <stop offset={0.98} stopColor="#C71D1D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_221_2399"
          x1={1.28497}
          y1={4.73865}
          x2={15.7249}
          y2={4.44837}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.03} stopColor="#F96A6A" />
          <stop offset={0.24} stopColor="#FF5A5A" />
          <stop offset={0.72} stopColor="#FF7979" />
          <stop offset={1} stopColor="#FF8B8B" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_221_2399"
          x1={8.83467}
          y1={17.961}
          x2={8.81803}
          y2={11.9046}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5A5A" />
          <stop offset={0.27} stopColor="#FF6969" />
          <stop offset={0.63} stopColor="#FF5A5A" />
          <stop offset={1} stopColor="#C82F2F" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_221_2399"
          x1={10.5722}
          y1={17.592}
          x2={14.8161}
          y2={11.5629}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D03939" />
          <stop offset={0.35} stopColor="#D53A3A" />
          <stop offset={0.88} stopColor="#C22626" />
          <stop offset={1} stopColor="#D12525" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_221_2399"
          x1={7.27662}
          y1={4.72223}
          x2={15.7269}
          y2={4.55235}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={0.04} stopColor="#101010" />
          <stop offset={0.15} stopColor="#474747" />
          <stop offset={0.26} stopColor="#787878" />
          <stop offset={0.38} stopColor="#A1A1A1" />
          <stop offset={0.49} stopColor="#C3C3C3" />
          <stop offset={0.61} stopColor="#DDDDDD" />
          <stop offset={0.73} stopColor="#F0F0F0" />
          <stop offset={0.86} stopColor="#FBFBFB" />
          <stop offset={1} stopColor="white" />
        </linearGradient>
        <clipPath id="clip0_221_2399">
          <rect width={17} height={18} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default DiamondDMCurrencyIcon;
