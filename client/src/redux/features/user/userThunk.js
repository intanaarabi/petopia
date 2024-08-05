import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

export const setUserProfile = createAsyncThunk(
    'user/setProfile',
    async (_, { rejectWithValue }) => {
        try {
          const response = await api.get('/auth/profile');
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
)
