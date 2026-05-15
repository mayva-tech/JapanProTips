import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        cream: "#f0ebe0",
        maroon: "#7a1f1f",
        rust: "#a0390f",
        tan: "#c8a96e",
        dark: "#1a1a1a",
        muted: "#5a5a5a",
      },
    },
  },
  plugins: [],
};

export default config;
