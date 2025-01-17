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
      keyframes: {
        smallPing: {
          '75%, 100%': { transform: 'scale(1.25)', opacity: '0.3' },
        },
      },
      animation: {
        smallPing: 'smallPing 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [scrollbarHide],
}

