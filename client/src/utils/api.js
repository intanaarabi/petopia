import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/features/auth/authThunk';

const apiWithoutInterceptor = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error();
    }
    return config;
  },
  (error) => {
    localStorage.removeItem('token');
    store.dispatch(logout());
    window.location.href = '/login';
    return Promise.reject(error);
  }
);

export { apiWithoutInterceptor };
export default api;