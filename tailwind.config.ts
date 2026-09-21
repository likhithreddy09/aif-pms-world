import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#120e0a",
          50: "#f7f3ec",
          100: "#ebe3d4",
          200: "#d4c4a8",
          300: "#b49a72",
          400: "#8a7353",
          500: "#5c4c38",
          600: "#3d3226",
          700: "#2a221b",
          800: "#1c1610",
          900: "#120e0a",
        },
        gold: {
          DEFAULT: "#c4a35a",
          light: "#d4b56a",
          dark: "#9a7c3a",
          muted: "#e8d9b0",
        },
        cream: {
          DEFAULT: "#f6f1e8",
          dark: "#ebe4d6",
        },
        paper: "#fbf8f2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,14,10,0.06), 0 8px 24px rgba(18,14,10,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
