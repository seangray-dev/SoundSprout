/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-1': '#2B2B2B',
        'gray-2': '#3B3B3B',
        'gray-3': '#CCCCCC',
        purple: '#A259FF',
      },
    },
  },
  plugins: [],
};
