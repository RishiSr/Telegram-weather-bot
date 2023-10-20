/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "another-purple": "#6F1AB6",
        "dark-purple": "#1D1236",
        "purple": "#523880",
        "light-purple": "#E3DCF7",
        "white-purple": "#F0ECFB",

      },
      screens: {
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' },
        '@md': { min: '640px', max: '767px' },
        '@lg': { min: '768px', max: '1023px' },
        '@xl': { min: '1024px', max: '1279px' },
        '@2xl': { min: '1280px', max: '1535px' },
        "smlg": { 'max': '1280px' },
        'smmax': { 'max': '639px' },
        "xsmmax": { 'max': "375px" }
      }
    },
  },
  plugins: [],
}