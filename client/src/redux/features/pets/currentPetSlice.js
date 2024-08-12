import { createSlice } from '@reduxjs/toolkit';
import { getPetDetails, getPetEvents, getPetLogs } from "./currentPetThunk";

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

const handleLogsPending = (state) => {
  state.loading.logs = true
};

const handleLogsFulfilled = (state, action) => {
  state.loading.logs = false
  state.logs = action.payload
};

const handleLogsRejected = (state) => {
  state.loading.logs = false
};

const handleEventsPending = (state) => {
  state.loading.events = true
};

const handleEventsFulfilled = (state, action) => {
  state.loading.events = false
  state.events = action.payload
};

const handleEventsRejected = (state) => {
  state.loading.events = false
};


const initialState = {
  metadata: null,
  diet: null,
  logs: [],
  events: [],
  loading: {
    metadata: false,
    diet: false,
    logs: false,
    events: false,
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
        .addCase(getPetLogs.pending, handleLogsPending)
        .addCase(getPetLogs.fulfilled, handleLogsFulfilled)
        .addCase(getPetLogs.rejected, handleLogsRejected)
        .addCase(getPetEvents.pending, handleEventsPending)
        .addCase(getPetEvents.fulfilled, handleEventsFulfilled)
        .addCase(getPetEvents.rejected, handleEventsRejected)
    },
  });
  

export default currentPetSlice.reducer;
export const { resetCurrentPet } = currentPetSlice.actions;

export const selectCurrentPetMetadata = (state) => state.currentPet.metadata;
export const selectCurrentPetLogs = (state) => state.currentPet.logs;
export const selectCurrentPetEvents = (state) => state.currentPet.events;
export const selectCurrentPetLoading = (state) => state.currentPet.loading;
