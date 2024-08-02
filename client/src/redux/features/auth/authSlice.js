import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, login } from './authThunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.token = null;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.token = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectLoginError = (state) => state.auth.error;