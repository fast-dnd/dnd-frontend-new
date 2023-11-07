import { jibril } from "@/utils/fonts";

const ThemeTitle = ({ title, blue }: { title: string; blue?: boolean }) => {
  return (
    <div className="relative flex h-[87px] justify-center lg:h-36">
      <div
        className="z-10 mt-4 text-center text-2xl font-normal uppercase leading-loose tracking-[3.15px] text-white lg:mt-[30px] lg:text-[42px]"
        style={jibril.style}
      >
        {title}
      </div>
      <div className="pointer-events-none absolute -top-8 max-lg:hidden">
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
      <div className="pointer-events-none absolute -top-24 lg:hidden">
        <svg
          width={360}
          height={284}
          viewBox="0 0 360 284"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_485_4209)">
            <path
              d="M69.8826 114.855L290.228 114.855L299 135.051L290.228 155.79H69.8826L61.3481 135.051L69.8826 114.855Z"
              fill={blue ? "#71CCFF" : "#FF5A5A"}
            />
          </g>
          <path
            d="M73.7377 110.877H285.787L295.909 135.142L285.787 159.408H73.7377L64.1128 135.142L73.7377 110.877Z"
            fill="#171716"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M150.734 166.246H137.989V162.748H151.66L179.374 178.535L205.685 162.748H221.519V166.246H206.654L179.42 182.586L150.734 166.246Z"
            fill={blue ? "#71CCFF" : "#FF5A5A"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M134.071 97H226.195L234.36 104.496H246.267V107.994H232.998L224.833 100.497H135.282L125.756 107.994H113.243V104.496H124.545L134.071 97Z"
            fill={blue ? "#71CCFF" : "#FF5A5A"}
          />
        </svg>
      </div>
    </div>
  );
};

export default ThemeTitle;
