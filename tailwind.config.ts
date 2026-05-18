import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0F",
        elev: "#14141C",
        elev2: "#1E1E2A",
        gold: "#FCD34D",
        goldDeep: "#F59E0B",
        ink: "#1F2937",
        line: "#2A2A38",
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', "Pretendard", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose2: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
