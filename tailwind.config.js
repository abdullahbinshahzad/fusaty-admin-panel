/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: 'var(--background-main)',
          card: 'var(--background-card)',
        },
        text: {
          main: 'var(--text-main)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        accent: 'var(--accent)',
        input: {
          bg: 'var(--input-bg)',
          text: 'var(--input-text)',
          placeholder: 'var(--input-placeholder)',
          readonlybg: 'var(--input-readonlybg)',
        },
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
}

