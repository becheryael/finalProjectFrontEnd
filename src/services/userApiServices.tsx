import axios from "axios";

export const loginUser = async (email: string, password: string) => {
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
  const url = `http://localhost:8000/users/logout`;
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        Authorization: token
      }
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
  const url = `http://localhost:8000/users/${id}`;
  try {
    const response = await axios({
      method: "patch",
      url: url,
      headers: {
        Authorization: token
      },
      data: {
        name,
        personalNum,
        email,
        avatar,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const newToken = async (
  token: string
) => {
  const url = `http://localhost:8000/users/newToken`;
  try {
    const response = await axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (
  email: string
) => {
  const url = `http://localhost:8000/users/forgotPassword`;
  try {
    const response = await axios({
      method: "POST",
      url: url,
      data: {
        email
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};