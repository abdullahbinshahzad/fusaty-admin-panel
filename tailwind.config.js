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
          filter: 'var(--background-filter)',
          search: 'var(--background-search)',
          activetab: 'var(--background-activetab)',
          sidebaractivetab: 'var(--background-sidebaractivetab)',
          sidebarhover: 'var(--background-sidebarhover)',
          thead: 'var(--background-thead)',
          tbody: 'var(--background-tbody)',
          sidemodal: 'var(--background-sidemodal)',
          user: 'var(--background-user)',
        },
        text: {
          main: 'var(--text-main)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          activetab: 'var(--text-activetab)',
          tablehead: 'var(--text-tablehead)',
          tablebody: 'var(--text-tablebody)',
          tableactionbtn: 'var(--text-tableactionbtn)',
          sidebarhover: 'var(--text-sidebarhover)',
        },
        accent: 'var(--accent)',
        input: {
          bg: 'var(--input-bg)',
          text: 'var(--input-text)',
          placeholder: 'var(--input-placeholder)',
          readonlybg: 'var(--input-readonlybg)',
        },
        border:{
          field: 'var(--border-field)',
          search: 'var(--border-search)',
          activetab: 'var(--border-activetab)',
          paginationbtn: 'var(--border-paginationbtn)'
        },
        searchbar: {
          divider: 'var(--searchbar-divider)'
        },
        navbar: {
          divider: 'var(--navbar-divider)'
        },
      },
    },
  },
  plugins: [],
}

