import { jibril } from "@/utils/fonts";

const ThemeTitle = ({ title, blue }: { title: string; blue?: boolean }) => {
  return (
    <div className="relative flex h-36 justify-center">
      <div
        className="z-10 mt-7 text-center text-[42px] font-normal uppercase leading-loose tracking-[3.15px] text-white"
        style={jibril.style}
      >
        {title}
      </div>
      <div className="pointer-events-none absolute -top-8">
        <svg
          width={529}
          height={255}
          viewBox="0 0 529 255"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M109.685 70.1406L418.177 70.1406L430.458 98.4152L418.177 127.451H109.685L97.7363 98.4152L109.685 70.1406Z"
            fill={blue ? "#71CCFF" : "#FF5A5A"}
          />
          <path
            d="M115.082 64.5742H411.959L426.13 98.547L411.959 132.52H115.082L101.606 98.547L115.082 64.5742Z"
            fill="#171716"
          />
          <path
            d="M205.037 139.645H223.528L263.009 162.134L300.491 139.645H321.981"
            stroke={blue ? "#71CCFF" : "#FF5A5A"}
            strokeWidth={4.89655}
          />
          <path
            d="M170.391 58.0888H187.062L200.398 47.5938H327.575L339.006 58.0888H356.63"
            stroke={blue ? "#71CCFF" : "#FF5A5A"}
            strokeWidth={4.89655}
          />
        </svg>
      </div>
    </div>
  );
};

export default ThemeTitle;
