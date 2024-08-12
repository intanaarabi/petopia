import { createSlice } from "@reduxjs/toolkit";
import { addPetEvents } from "./eventsThunk";

const initialState = {
    loading: {
      add: false,
      edit: false,
      delete: false,
    },
};

const handleAdd = (state, action) => {
    switch (action.type) {
        case addPetEvents.pending.type:
            state.loading.add = true;
            break;
        case addPetEvents.fulfilled.type:
        case addPetEvents.rejected.type:
            state.loading.add = false;
            break;
        default:
        return;
    }
};
  
const eventsSlice = createSlice({
    name: 'events',
    initialState,
    extraReducers: (builder) => {
    builder
        .addCase(addPetEvents.pending, handleAdd)
        .addCase(addPetEvents.fulfilled, handleAdd)
        .addCase(addPetEvents.rejected, handleAdd)
    },
});

export default eventsSlice.reducer;

export const selectEventsLoading = (state) => state.events.loading;
