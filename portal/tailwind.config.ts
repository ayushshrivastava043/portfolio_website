import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#2563EB",
          dark: "#3B82F6",
          muted: "rgba(37, 99, 235, 0.12)",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FAFAFA",
          dark: "#09090B",
          "dark-elevated": "#18181B",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.25rem", { lineHeight: "1.75rem" }],
        xl: ["1.5rem", { lineHeight: "2rem" }],
        "2xl": ["2rem", { lineHeight: "2.5rem" }],
        "3xl": ["3rem", { lineHeight: "1.15" }],
        "4xl": ["4rem", { lineHeight: "1.1" }],
      },
      borderRadius: {
        sm: "8px",
        lg: "16px",
      },
      boxShadow: {
        rest: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
        lift: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        content: "1120px",
      },
      transitionDuration: {
        hover: "180ms",
        page: "280ms",
      },
    },
  },
  plugins: [],
};
export default config;
