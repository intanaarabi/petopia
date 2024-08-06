import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice'
import petsReducer from './features/pets/petsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    pets: petsReducer
  },
  devTools: true 
});

export default store;