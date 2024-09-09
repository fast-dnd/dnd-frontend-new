/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        basic: "0px 0px 20px 0px rgba(255, 90, 90, 0.4)",
        lobby: "0px 1px 0px 0px rgba(255, 255, 255, 0.06);",
      },
      backgroundImage: {
        radialGradient: "radial-gradient(circle at 50%, #ffffff06, transparent 75%)",
        coinRadialGradient:
          "radial-gradient(50% 50% at 50% 50%, #DDA133 0%, rgba(221, 161, 51, 0.00) 94.22%)",
        rewardGradient: "linear-gradient(97deg, #FBBC05 -11.66%, #977000 48.65%, #473500 91.92%)",
      },
      colors: {
        primary: {
          50: "#FFEAEA",
          100: "#FFD6D6",
          200: "#FFACAC",
          300: "#FF9898",
          400: "#FF8383",
          500: "#FF5A5A",
          DEFAULT: "#FF5A5A",
          600: "#DB414F",
          700: "#B72D45",
          800: "#931C3B",
          900: "#0d0b12",
          wordChallenge: "#FE9090",
        },
        dark: {
          50: "#F0F0EF",
          100: "#E1E1E0",
          200: "#C7C7C7",
          300: "#ACACAA",
          400: "#919191",
          500: "#757575",
          DEFAULT: "#757575",
          600: "#5E5E5E",
          700: "#484847",
          800: "#303030",
          900: "#0d0b12",
        },
        custom: {
          1: "#1c1c1c",
        },
        success: "#51DA88",
        error: "#DA5151",
        warning: "#F5AF45",
        info: "#51B1DA",
        glass: "rgba(23, 23, 22, 0.5)",
        select: "#606768",
        selectHover: "#555b5c",
        selectSelected: "#4e5354",
        gold: "#FFD700",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
