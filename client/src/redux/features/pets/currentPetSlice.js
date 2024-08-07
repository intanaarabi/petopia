import { createSlice } from '@reduxjs/toolkit';
import { getPetDetails } from "./currentPetThunk";

const handleMetadataPending = (state) => {
    state.loading.metadata = true
};

const handleMetadataFulfilled = (state, action) => {
    state.loading.metadata = false
    state.metadata = action.payload
};

const handleMetadataRejected = (state) => {
    state.loading.metadata = false
};

const initialState = {
  metadata: null,
  diet: null,
  logs: [],
  appointments: [],
  loading: {
    metadata: false,
    diet: false,
    logs: false,
    appointments: false,
  },
};

const currentPetSlice = createSlice({
    name: 'currentPet',
    initialState,
    reducers: {
      resetCurrentPet: () => {
        return initialState;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPetDetails.pending, handleMetadataPending)
        .addCase(getPetDetails.fulfilled, handleMetadataFulfilled)
        .addCase(getPetDetails.rejected, handleMetadataRejected)
    },
  });
  

export default currentPetSlice.reducer;
export const { resetCurrentPet } = currentPetSlice.actions;

export const selectCurrentPetMetadata = (state) => state.currentPet.metadata;
export const selectCurrentPetLoading = (state) => state.currentPet.loading;
