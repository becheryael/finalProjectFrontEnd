import React, { useState, PropsWithChildren } from "react";

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<PropsWithChildren> = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
