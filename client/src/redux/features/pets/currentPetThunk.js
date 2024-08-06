import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";


export const getPetDetails = createAsyncThunk(
    'pets/getPetDetails',
    async (petId, {rejectWithValue }) => {
        try {
            const response = await api.get(`/pets/${petId}`);
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)
