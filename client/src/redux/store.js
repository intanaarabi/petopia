import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  devTools: true 
});

export default store;