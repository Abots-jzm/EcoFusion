import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1e1e1e",
        lightGray: "#ccc",
        darkAccent: "#3e3e3e",
        darkMutedText: "#777",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fill, minmax(23rem, 1fr))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;

export default config;
