/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'color-secondary': '#DAA520',
        'color-primary': '#F8F8FF',
        'color-gray': '#A9A9A9',
      },
    },
  },
  plugins: [
    require('daisyui'), // Menambahkan plugin daisyUI
  ],
};
