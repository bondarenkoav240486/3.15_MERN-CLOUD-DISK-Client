// axiosConfig.js
import axios from 'axios';

// import { store } from './store'; // Імпорт Redux store
import { store } from './reducers'; // Імпорт Redux store

// import { logout } from './actions/authActions'; // Екшен для логауту
import { logout } from './reducers/userReducer'; // Екшен для логауту



const instance = axios.create({
//   baseURL: 'http://localhost:5000/api', // Змініть на ваш базовий URL
  // baseURL: 'http://localhost:5000/', // Змініть на ваш базовий URL
  baseURL: 'http://localhost:5315/', // Змініть на ваш базовий URL
});

// Додаємо інтерсептор для відповідей
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Якщо сервер повертає 401, виконуємо логаут
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default instance;
