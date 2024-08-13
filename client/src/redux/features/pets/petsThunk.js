import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const getPetList = createAsyncThunk(
    'pets/getPetList',
    async (_, {rejectWithValue }) => {
        try {
            const response = await api.get('/pets');
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


export const addPet = createAsyncThunk(
    'pets/addPet',
    async (petForm, { rejectWithValue }) => {
        try {
            const response = await api.post('/pets',petForm);
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)
