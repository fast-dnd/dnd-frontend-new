/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        tomato: "#ff5a5a",
        success: "#51DA88",
        error: "#DA5151",
        warning: "#F5AF45",
        info: "#51B1DA",
        glass: "rgba(23, 23, 22, 0.5)",
      },
    },
  },
  plugins: [],
};
