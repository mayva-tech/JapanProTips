import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Barlow", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Vollkorn", "Georgia", "serif"],
        heading: ["var(--font-serif)", "Vollkorn", "Georgia", "serif"],
        display: ["var(--font-serif)", "Vollkorn", "Georgia", "serif"],
        nav: ["var(--font-nav)", "Roboto Slab", "Georgia", "serif"],
      },
      fontSize: {
        body: ["19px", { lineHeight: "1.58", letterSpacing: "0" }],
        "body-desktop": ["21px", { lineHeight: "1.62", letterSpacing: "0" }],
        lead: ["22px", { lineHeight: "1.42", letterSpacing: "0" }],
        "lead-desktop": ["24px", { lineHeight: "1.42", letterSpacing: "0" }],
        h2: ["28px", { lineHeight: "1.22", letterSpacing: "0.25px" }],
        "h2-lg": ["40px", { lineHeight: "1.18", letterSpacing: "0" }],
        h1: ["40px", { lineHeight: "1.12", letterSpacing: "0" }],
        hero: ["56px", { lineHeight: "1.12", letterSpacing: "0" }],
        kicker: ["14px", { lineHeight: "1.5", letterSpacing: "1.2px" }],
        nav: ["14px", { lineHeight: "1.5", letterSpacing: "0.45px" }],
      },
      lineHeight: {
        normal: "1.55",
        relaxed: "1.55",
        snug: "1.32",
      },
      colors: {
        paper: {
          DEFAULT: "#f8f7f0",
          elevated: "#f0efe8",
          card: "#faf9f4",
          edge: "#d4c9b0",
        },
        cream: "#f8f7f0",
        ink: "#2c2823",
        maroon: "#87240f",
        oxblood: "#5c2112",
        rust: "#cf4f00",
        tan: "#b8956a",
        dark: "#2c2823",
        muted: "#4a4540",
        /** Tool form chips: off = cream row, on = beige + mahogany ink */
        "tool-off": "#F9F9F5",
        "tool-on": "#EBE0DA",
        "tool-ink": "#6D2E1E",
        "tool-border-off": "#D8D4CE",
      },
      boxShadow: {
        editorial: "0 1px 2px rgba(44, 40, 35, 0.06), 0 4px 12px rgba(44, 40, 35, 0.04)",
        "editorial-hover":
          "0 2px 4px rgba(44, 40, 35, 0.08), 0 8px 20px rgba(44, 40, 35, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
