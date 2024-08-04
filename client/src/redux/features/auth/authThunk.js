import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './authSlice';
import api , { apiWithoutInterceptor } from '../../../utils/api';


// Thunk for logging in
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiWithoutInterceptor.post('/auth/login', credentials);
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
      const response = await api.get('/auth/verify-token');
      if (response.data.valid) {
        return response.data.userId;
      } else {
        throw new Error();
      }
    } catch (error) {
      dispatch(logout());
      return rejectWithValue();
    }
  }
);