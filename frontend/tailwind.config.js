import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Google Sans', 'sans-serif'],
        monoton: ["Monoton", sans-serif],
      },
      colors: {
        primary: 'var(--primary)',
      },
    },
  },
  plugins: [
    scrollbar,
  ],
}