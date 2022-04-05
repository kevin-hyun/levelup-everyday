import { useContext } from 'react';

const isLogin = () => {
  if (localStorage.getItem('token')) {
    return localStorage.getItem('token');
  } else {
    return null;
  }
};
export default isLogin;
