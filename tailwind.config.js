/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", 
    "./*.html"            // ou ajuste conforme sua estrutura
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rawline', 'sans-serif'], // usa "Rawline" como sans
        rawline: ['Rawline', 'sans-serif'] // opcional, alias dedicado
      },
    },
  },
  plugins: [],
}
