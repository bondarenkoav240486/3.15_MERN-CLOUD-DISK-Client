// autoLogout.js
import jwtDecode from 'jwt-decode';
import { store } from './store';
import { logout } from './actions/authActions';

const checkTokenExpirationMiddleware = store => next => action => {
  if (action.type === 'LOGIN_SUCCESS') {
    const { token } = action.payload;
    const decodedToken = jwtDecode(token);

    // Обчислюємо час до закінчення токена
    const currentTime = Date.now() / 1000;
    const timeToExpiration = decodedToken.exp - currentTime;

    // Установка таймера для логауту
    setTimeout(() => {
      store.dispatch(logout());
    }, timeToExpiration * 1000);
  }
  next(action);
};

export default checkTokenExpirationMiddleware;
