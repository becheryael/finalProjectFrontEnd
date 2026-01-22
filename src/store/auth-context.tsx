import React, { useState, PropsWithChildren, useEffect, useCallback } from "react";

let logoutTimer:  ReturnType<typeof setTimeout>;

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (
    token: string,
    user: { name: string; personalNum: string; email: string, avatar: string },
    id: string,
    isManager: boolean,
    expirationTime: string,
  ) => void;
  logout: () => void;
  userInfo: {
    name: string | null;
    personalNum: string | null;
    email: string | null;
    avatar: string | null;
  };
  userId: string | null;
  isManager: boolean;
  edit: (newName: string, newPersonalNum: string, newEmail: string, newAvatar: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  login: (
    token: string,
    user: { name: string; personalNum: string; email: string, avatar: string },
    id: string,
    isManager: boolean,
    expirationTime: string
  ) => {},
  logout: () => {},
  userInfo: {
    name: "",
    personalNum: "",
    email: "",
    avatar: '',
  },
  userId: "",
  isManager: false,
  edit: (newName: string, newPersonalNum: string, newEmail: string, newAvatar: string) => {},
});

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate!);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider: React.FC<PropsWithChildren> = (props) => {
  const tokenData = retrieveStoredToken();
  
  let initialToken: string;
  if (tokenData) {
    initialToken = tokenData.token!;
  }

  // const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>(initialToken!);
  const initailName = localStorage.getItem("name");
  const initailPersonalNum = localStorage.getItem("personalNum");
  const initialEmail = localStorage.getItem("email");
  const initialAvatar = localStorage.getItem("avatar");
  const manager = localStorage.getItem("manager");
  const id = localStorage.getItem("id");

  let managerBoolean: boolean;
  if (manager === 'true') {
    managerBoolean = true;
  } else {
    managerBoolean = false;
  }

  const [userId, setUserId] = useState<string | null>(id);
  const [isManager, setIsManager] = useState<boolean>(managerBoolean);


  const [userInfo, setUserInfo] = useState({
    name: initailName,
    personalNum: initailPersonalNum,
    email: initialEmail,
    avatar: initialAvatar,
  });

  const userIsLoggedIn = !!token;

  const loginHandler = (
    token: string,
    user: { name: string; personalNum: string; email: string, avatar: string },
    id: string,
    isManager: boolean,
    expirationTime: string
  ) => {
    setToken(token);
    setUserInfo({
      name: user.name,
      personalNum: user.personalNum,
      email: user.email,
      avatar: user.avatar,
    });
    setUserId(id);
    setIsManager(isManager);
    localStorage.setItem("name", user.name);
    localStorage.setItem("personalNum", user.personalNum);
    localStorage.setItem("email", user.email);
    localStorage.setItem("id", id);
    localStorage.setItem("avatar", user.avatar);
    localStorage.setItem("manager", String(isManager));
    
    localStorage.setItem("token", token);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("personalNum");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("avatar");
    localStorage.removeItem("manager");
    localStorage.removeItem('expirationTime');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

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
    userId,
    isManager,
    edit: editProfileHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
