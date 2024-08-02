import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';
import { logout } from './authSlice';

// Thunk for logging in
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for checking authentication status
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        return token;
      } else {
        dispatch(logout());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);