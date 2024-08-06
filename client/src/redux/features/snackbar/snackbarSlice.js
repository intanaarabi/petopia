import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    snackbars: [],
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.snackbars.push({
        id: Date.now(), // unique id
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    hideSnackbar: (state, action) => {
      state.snackbars = state.snackbars.filter(snackbar => snackbar.id !== action.payload);
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
