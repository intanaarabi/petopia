import { createSlice } from '@reduxjs/toolkit';
import { setUserProfile } from './userThunk';

const handlePending = (state) => {
  state.name = null;
  state.email = null;
};

const handleFulfilled = (state, action) => {
  const {name, email} = action.payload
  state.name = name;
  state.email = email;
};

const handleRejected = (state) => {
    state.name = null;
    state.email = null;
};


const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
  },
  reducers: {
    clearUserProfile: handleRejected,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserProfile.pending, handlePending)
      .addCase(setUserProfile.fulfilled, handleFulfilled)
      .addCase(setUserProfile.rejected, handleRejected)
  },
});

export const { clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
