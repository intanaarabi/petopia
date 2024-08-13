import { createSlice } from "@reduxjs/toolkit";
import { addPetLog, getWeightLogs } from "./logsThunk";

const initialState = {
    weightGraphData: [],
    loading: {
      graph: false,
      list: false,
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

const handleGraph = (state, action) => {
    switch (action.type) {
        case getWeightLogs.pending.type:
            state.loading.graph = true;
            break;
        case getWeightLogs.fulfilled.type:
            state.loading.graph = false;
            state.weightGraphData = action.payload;
            break;
        case getWeightLogs.rejected.type:
            state.loading.graph = false;
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
        .addCase(getWeightLogs.pending, handleGraph)
        .addCase(getWeightLogs.fulfilled, handleGraph)
        .addCase(getWeightLogs.rejected, handleGraph)
    },
});

export default logsSlice.reducer;

export const selectLogsLoading = (state) => state.logs.loading;
export const selectWeightData = (state) => state.logs.weightGraphData;