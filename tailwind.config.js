/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Space Grotesk', 'sans-serif'],
        'mono-code': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        neon: {
          green: '#ccff00',
          lime: '#a3e635',
        }
      }
    },
  },
  plugins: [],
}
