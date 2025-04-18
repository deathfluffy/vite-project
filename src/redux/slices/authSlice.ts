import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthResponse, AuthState } from '../../types';

interface ErrorResponse {
  message: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const register = createAsyncThunk<
  AuthResponse, 
  { email: string; password: string; name: string }, 
  { rejectValue: ErrorResponse } 
>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/auth/register', credentials);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || { message: 'Registration failed' });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
);

export const login = createAsyncThunk<
  AuthResponse, 
  { email: string; password: string }, 
  { rejectValue: ErrorResponse } 
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/auth/login', credentials);
      return data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || { message: 'Login failed' });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
);

export const logout = createAsyncThunk<
  void,
  { id: string }, 
  { rejectValue: ErrorResponse } 
>(
  'auth/logout',
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout', { id }); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || { message: 'Logout failed' });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Registration failed';
      });
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Login failed';
      });
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Logout failed';
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;