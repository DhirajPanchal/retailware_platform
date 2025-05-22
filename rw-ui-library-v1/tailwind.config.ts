import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        btn: {
          bg: "var(--solid-bg)",
          text: "var(--solid-text)",
          border: "var(--solid-border)",
          hover: "var(--solid-hover-bg)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
