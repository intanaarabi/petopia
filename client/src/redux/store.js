import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice'
import petsReducer from './features/pets/petsSlice'
import currentPetReducer from './features/pets/currentPetSlice'
import snackbarReducer from './features/snackbar/snackbarSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    pets: petsReducer,
    currentPet: currentPetReducer,
    snackbar: snackbarReducer,
  },
  devTools: true 
});

export default store;