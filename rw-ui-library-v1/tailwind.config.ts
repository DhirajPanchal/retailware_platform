import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        btn: {
          bg: "var(--btn-bg)",
          text: "var(--btn-text)",
          border: "var(--btn-border)",
          hover: "var(--btn-hover-bg)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
 