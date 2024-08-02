import axios from 'axios';
import { loginSuccess, loginFailure, logout } from '../reducers/authReducer';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token) {
    dispatch(loginSuccess(token));
  } else {
    dispatch(logout());
  }
};