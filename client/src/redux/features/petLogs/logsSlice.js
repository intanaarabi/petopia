import { createSlice } from "@reduxjs/toolkit";
import { addPetLog } from "./logsThunk";

const initialState = {
    loading: {
      add: false,
      edit: false,
      delete: false,
    },
};

const handleAdd = (state, action) => {
    switch (action.type) {
        case addPetLog.pending.type:
            state.loading.add = true;
            break;
        case addPetLog.fulfilled.type:
        case addPetLog.rejected.type:
            state.loading.add = false;
            break;
        default:
        return;
    }
};
  
const logsSlice = createSlice({
    name: 'logs',
    initialState,
    extraReducers: (builder) => {
    builder
        .addCase(addPetLog.pending, handleAdd)
        .addCase(addPetLog.fulfilled, handleAdd)
        .addCase(addPetLog.rejected, handleAdd)
    },
});

export default logsSlice.reducer;

export const selectLogsLoading = (state) => state.logs.loading;
