// Theme configuration for light and dark modes

export const theme = {
  light: {
    '--background-main': '#EEF3F9',
    '--background-card': '#FFFFFF',
    '--text-main': '#FFFFFF',
    '--text-primary': '#000000',
    '--text-secondary': '#00000080',
    '--accent': '#8345E9',
    '--input-bg': '#EEF3F9',
    '--input-text': '#1E233A',
    '--input-placeholder': '#00000040',
    '--border': '#D1D4DB',
  },
  dark: {
    '--background-main': '#1E233A',
    '--background-card': '#262D4A',
    '--text-main': '#FFFFFF',
    '--text-primary': '#FFFFFF',
    '--text-secondary': '#FFFFFF80',
    '--accent': '#8345E9',
    '--input-bg': '#262D4A',
    '--input-text': '#FFFFFF',
    '--input-placeholder': '#FFFFFF66',
    '--border': '#FFFFFF33',
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
