import { createAsyncThunk } from '@reduxjs/toolkit';
import api , { apiWithoutInterceptor } from '../../../utils/api';
import { clearUserProfile } from '../user/userSlice';
import { setUserProfile } from '../user/userThunk';

// Thunk for logging in
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiWithoutInterceptor.post('/auth/login', credentials);
      const token = response.data.token;
      localStorage.setItem('token', response.data.token);

      dispatch(setUserProfile())
      return token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Thunk for register
export const registerUser = createAsyncThunk(
  'auth/register',
    async (credentials, { dispatch, rejectWithValue }) => {
      try {
        const response = await apiWithoutInterceptor.post('/auth/register', credentials);
        const token = response.data.token;
        localStorage.setItem('token', token);

        dispatch(setUserProfile())
        return token;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
)

// Thunk for checking authentication status
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.get('/auth/verify-token');
      dispatch(setUserProfile())
    } catch (error) {
      dispatch(logout());
      return rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token');
  dispatch(clearUserProfile())
  return
});