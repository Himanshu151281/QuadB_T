import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

// Load initial state from localStorage
const loadAuthState = (): AuthState => {
  try {
    const savedState = localStorage.getItem('authState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading auth state:', error);
  }
  return {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = loadAuthState();

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    // Simulated API call
    const response = await new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          resolve({
            id: '1',
            email,
            name: email.split('@')[0],
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authState');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        // Save to localStorage
        localStorage.setItem('authState', JSON.stringify(state));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Invalid email or password';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;