import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
      },
      height: {
        'header': 'var(--header-height)',
      },
    },
    screens: {
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
  },
  plugins: [],
} satisfies Config;
