import React, { useState } from 'react';
const AuthContext = React.createContext({
  token: '',
  isLoggendIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  //empty => !!token === false
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextvalue = {
    token: token,
    isLoggendIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextvalue}>
      {console.log('auth 렌더링')}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
