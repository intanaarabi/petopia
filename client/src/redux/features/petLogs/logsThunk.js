import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const addPetLog = createAsyncThunk(
    'pets/addPetLog',
    async (logForm, { rejectWithValue }) => {
        try {
            const response = await api.post('/logs',logForm);
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const getWeightLogs = createAsyncThunk(
    'pets/getWeightLogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/logs/weight-data');
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)