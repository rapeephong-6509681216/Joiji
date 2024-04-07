/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-home': "url('./src/assets/backgrounds/background-home.png')",
        'background-signup': "url('./src/assets/backgrounds/background-signup.png')"
      },
      colors: {
        'red-netflix': '#EC0000',
        'red-netflix-active': '#99161d',
        'black-netflix': '#1B1B19',
        'black-netflix-active': '#141414'
      }
    },
  },
}

