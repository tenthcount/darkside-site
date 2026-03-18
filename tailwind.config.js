/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        deep: '#111111',
        card: '#161616',
        'card-border': '#222222',
        red: { DEFAULT: '#d4182a', dark: '#b51424', glow: 'rgba(212,24,42,.35)' },
        gold: { DEFAULT: '#c9a84c', dim: 'rgba(201,168,76,.2)' },
        white: '#f0ece4',
        grey: { DEFAULT: '#888888', dim: '#555555' },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['"Oswald"', 'sans-serif'],
        body: ['"Barlow Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
