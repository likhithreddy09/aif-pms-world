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
          DEFAULT: "#0b0b0c",
          50: "#f4f3f0",
          100: "#e6e4df",
          200: "#c9c5bc",
          300: "#9e9a90",
          400: "#6e6a62",
          500: "#4a473f",
          600: "#2f2d28",
          700: "#1f1e1b",
          800: "#161513",
          900: "#0b0b0c",
        },
        gold: {
          DEFAULT: "#a89262",
          light: "#bba67a",
          dark: "#7d6b45",
          muted: "#cfc3a8",
        },
        cream: {
          DEFAULT: "#f0efeb",
          dark: "#e2e0d8",
        },
        paper: "#f7f6f2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,14,10,0.06), 0 8px 24px rgba(18,14,10,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
