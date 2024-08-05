import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, login, logout, registerUser } from './authThunk';

const handlePending = (state) => {
  state.isAuthorized = false
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = (state) => {
  state.isAuthorized = true
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isAuthorized = false
  state.isLoading = false;
  state.error = action.payload;
};


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
    isLoading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(login.rejected, handleRejected)
      .addCase(checkAuth.pending, handlePending)
      .addCase(checkAuth.fulfilled, handleFulfilled)
      .addCase(checkAuth.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(logout.fulfilled, (state) => {
        state.isAuthorized = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;

export const selectIsAuthorized = (state) => state.auth.isAuthorized;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectLoginError = (state) => state.auth.error;