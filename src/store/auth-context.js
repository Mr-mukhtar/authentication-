import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    let logoutTimer;
    if (userIsLoggedIn) {
      logoutTimer = setTimeout(() => {
        logoutHandler();
      }, 30000); // Logout after 30 seconds of inactivity
    }

    // Reset the timer if there is user activity
    const activityHandler = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(() => {
          logoutHandler();
        }, 30000);
      }
    };

    window.addEventListener('click', activityHandler);
    window.addEventListener('keydown', activityHandler);

    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      window.removeEventListener('click', activityHandler);
      window.removeEventListener('keydown', activityHandler);
    };
   }, [userIsLoggedIn]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
