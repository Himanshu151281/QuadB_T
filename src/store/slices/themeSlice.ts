import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
}

const loadThemeState = (): ThemeState => {
  try {
    const savedState = localStorage.getItem('themeState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading theme state:', error);
  }
  return { darkMode: false };
};

const initialState: ThemeState = loadThemeState();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('themeState', JSON.stringify(state));
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;