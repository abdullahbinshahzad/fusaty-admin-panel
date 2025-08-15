// Theme configuration for light and dark modes

export const theme = {
  light: {
    '--background-main': '#EEF3F9',
    '--background-card': '#FFFFFF',
    '--background-filter': '#DFE6EDA3',
    '--background-search': '#FFFFFF',
    '--background-activetab': '#FFFFFF',
    '--background-thead':'#DFE6ED',
    '--background-tbody':'#FFFFFF',
    '--background-sidebaractivetab': '#8345E90F',
    '--background-sidemodal': '#FFFFFF',
    '--text-main': '#FFFFFF',
    '--text-primary': '#000000',
    '--text-secondary': '#00000080',
    '--text-activetab': '#8345E9',
    '--text-tablehead': '#212529',
    '--text-tablebody': '#3B4249',
    '--text-tableactionbtn': '#496683',
    '--accent': '#8345E9',
    '--input-bg': '#EEF3F9',
    '--input-text': '#1E233A',
    '--input-placeholder': '#00000040',
    '--input-readonlybg': '#AD84F0',
    '--border-field': '#D1D4DB',
    '--border-search': '#FFFFFF',
    '--border-activetab': '#8345E9',
    '--border-paginationbtn': '#D1D4DB',
    '--searchbar-divider': '#D1D4DB',
    '--navbar-divider': '#496683',
  },
  dark: {
    '--background-main': '#1E233A',
    '--background-card': '#262D4A',
    '--background-filter': '#262D4A',
    '--background-search': '#262D4A',
    '--background-activetab': '#8345E9',
    '--background-thead':'#8345E9',
    '--background-tbody':'#262D4A',
    '--background-sidebaractivetab': '#8345E9',
    '--background-sidemodal': '#1E233A',
    '--text-main': '#FFFFFF',
    '--text-primary': '#FFFFFF',
    '--text-secondary': '#FFFFFF80',
    '--text-activetab': '#FFFFFF',
    '--text-tablehead': '#FFFFFF',
    '--text-tablebody': '#FFFFFF',
    '--text-tableactionbtn': '#FFFFFF',
    '--accent': '#8345E9',
    '--input-bg': '#262D4A',
    '--input-text': '#FFFFFF',
    '--input-placeholder': '#FFFFFF66',
    '--input-readonlybg': '#AD84F0',
    '--border-field': '#FFFFFF33',
    '--border-search': '#3A5075',
    '--border-activetab': '#FFFFFF',
    '--border-paginationbtn': '#3A5075',
    '--searchbar-divider': '#3A5075',
    '--navbar-divider': '#9DB2C8',
  },
};

export function applyTheme(mode) {
  const themeVars = theme[mode];
  if (themeVars) {
    Object.entries(themeVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
}
