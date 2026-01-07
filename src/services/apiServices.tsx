import axios from "axios";
// import AuthContext from "../store/auth-context";
// import { useContext } from "react";

export const fetchUser = async (email: string, password: string) => {
  const url = "http://localhost:8000/users/login";
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: {
        email,
        password,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  email: string,
  password: string,
  personalNum: string,
  name: string
) => {
  const url = "http://localhost:8000/users/create";
  // const convertedpersonalNum = Number(personalNum)
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: {
        email,
        password,
        personalNum,
        name,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (token: string) => {
  const url = `http://localhost:8000/users/logout/${token}`;
  try {
    const response = await axios({
      method: "post",
      url: url,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (
  name: string,
  personalNum: string,
  email: string,
  avatar: string,
  id: string,
  token: string
) => {
  // const authCtx = useContext(AuthContext);
  const url = `http://localhost:8000/users/${id}/${token}`;
  // const convertedpersonalNum = Number(personalNum)
  try {
    const response = await axios({
      method: "patch",
      url: url,
      data: {
        name,
        personalNum,
        email,
        avatar
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};