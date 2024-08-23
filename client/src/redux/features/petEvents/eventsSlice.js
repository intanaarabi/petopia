import { createSlice } from "@reduxjs/toolkit";
import { addPetEvents, getEvents } from "./eventsThunk";

const initialState = {
    list: [],
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

const handleList = (state, action) => {
    switch (action.type) {
        case getEvents.pending.type:
            state.loading.list = true;
            break;
        case getEvents.fulfilled.type:
            state.loading.list = false;
            state.list = action.payload;
            break;
        case getEvents.rejected.type:
            state.loading.list = false;
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
        .addCase(getEvents.pending, handleList)
        .addCase(getEvents.fulfilled, handleList)
        .addCase(getEvents.rejected, handleList)
    },
});

export default eventsSlice.reducer;

export const selectEventsLoading = (state) => state.events.loading;
export const selectEvents = (state) => state.events.list;