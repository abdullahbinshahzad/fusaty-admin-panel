import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('themeMode') || 'light', // Default to light mode if not stored
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('themeMode', action.payload); // Persist theme mode
    },
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.mode);
    },
  },
});

export const { setThemeMode, toggleThemeMode } = themeSlice.actions;
export default themeSlice.reducer; 