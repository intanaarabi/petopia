import { createSlice } from "@reduxjs/toolkit";
import { addPetLog, getLogs, getWeightLogs } from "./logsThunk";

const initialState = {
    weightGraphData: [],
    list: [],
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

const handleList = (state, action) => {
    switch (action.type) {
        case getLogs.pending.type:
            state.loading.list = true;
            break;
        case getLogs.fulfilled.type:
            state.loading.list = false;
            state.list = action.payload;
            break;
        case getLogs.rejected.type:
            state.loading.list = false;
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
        .addCase(getLogs.pending, handleList)
        .addCase(getLogs.fulfilled, handleList)
        .addCase(getLogs.rejected, handleList)
    },
});

export default logsSlice.reducer;

export const selectLogsLoading = (state) => state.logs.loading;
export const selectWeightData = (state) => state.logs.weightGraphData;
export const selectLogs = (state) => state.logs.list