/** @type {import('tailwindcss').Config} */

import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d70018',
        background: '#F5F5F5',
        'background-hover': '#EAEAEA',
        text: '#444',
        'text-light': '#FFFFFF',
      },

    },
  },
  plugins: [scrollbarHide],
}

