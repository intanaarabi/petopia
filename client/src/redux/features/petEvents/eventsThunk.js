import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const addPetEvents = createAsyncThunk(
    'pets/addPetEvents',
    async (eventForm, { rejectWithValue }) => {
        try {
            const response = await api.post(`/events`, eventForm);
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)
