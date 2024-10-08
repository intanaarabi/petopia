import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const addPetEvents = createAsyncThunk(
    'events/addPetEvents',
    async (eventForm, { rejectWithValue }) => {
        try {
            const response = await api.post(`/events`, eventForm);
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const getEvents = createAsyncThunk(
    'events/getEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/events');
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)