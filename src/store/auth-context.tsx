import React, { useState, PropsWithChildren } from "react";

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (
    token: string,
    user: { name: string; personalNum: string; email: string, avatar: string },
    id: string,
  ) => void;
  logout: () => void;
  userInfo: {
    name: string | null;
    personalNum: string | null;
    email: string | null;
    avatar: string | null;
  };
  userId: string | null;
  edit: (newName: string, newPersonalNum: string, newEmail: string, newAvatar: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  login: (
    token: string,
    user: { name: string; personalNum: string; email: string, avatar: string },
    id: string
  ) => {},
  logout: () => {},
  userInfo: {
    name: "",
    personalNum: "",
    email: "",
    avatar: '',
  },
  userId: "",
  edit: (newName: string, newPersonalNum: string, newEmail: string, newAvatar: string) => {},
});

export const AuthContextProvider: React.FC<PropsWithChildren> = (props) => {
  const initialToken = localStorage.getItem("token");
  const initailName = localStorage.getItem("name");
  const initailPersonalNum = localStorage.getItem("personalNum");
  const initialEmail = localStorage.getItem("email");
  const initialAvatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("id");

  const [token, setToken] = useState<string | null>(initialToken);
  const [userId, setUserId] = useState<string | null>(id);
  const [userInfo, setUserInfo] = useState({
    name: initailName,
    personalNum: initailPersonalNum,
    email: initialEmail,
    avatar: initialAvatar
  });

  const userIsLoggedIn = !!token;

  const loginHandler = (
    token: string,
    user: { name: string; personalNum: string; email: string, avatar: string },
    id: string,
  ) => {
    setToken(token);
    setUserInfo({
      name: user.name,
      personalNum: user.personalNum,
      email: user.email,
      avatar: user.avatar
    });
    setUserId(id);
    localStorage.setItem("token", token);
    localStorage.setItem("name", user.name);
    localStorage.setItem("personalNum", user.personalNum);
    localStorage.setItem("email", user.email);
    localStorage.setItem("id", id);
    localStorage.setItem("avatar",user.avatar);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("personalNum");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("avatar");
  };

  const editProfileHandler = (
    newName: string,
    newPersonalNum: string,
    newEmail: string,
    newAvatar: string
  ) => {
    setUserInfo({
      name: newName,
      personalNum: newPersonalNum,
      email: newEmail,
      avatar: newAvatar
    });
    localStorage.setItem("name", newName);
    localStorage.setItem("personalNum", newPersonalNum);
    localStorage.setItem("email", newEmail);
    localStorage.setItem("avatar", newAvatar);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userInfo,
    edit: editProfileHandler,
    userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
