import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const addPetLog = createAsyncThunk(
    'logs/addPetLog',
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
    'logs/getWeightLogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/logs/weight-data');
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)
export const getLogs = createAsyncThunk(
    'logs/getLogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/logs');
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)