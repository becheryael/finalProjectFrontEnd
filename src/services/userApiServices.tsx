import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_USER_ROUTE
});

export const loginUser = async (email: string, password: string) => {
    const response = await api.post("/login", {
      email,
      password
    });
    return response;
};

export const createUser = async (
  email: string,
  password: string,
  personalNum: string,
  name: string
) => {
    const response = await api.post("/create", {
      email,
      password,
      personalNum,
      name
    });
    return response;
};

export const logoutUser = async (token: string) => {
    const response = await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
};

export const editUser = async (
  name: string,
  personalNum: string,
  email: string,
  avatar: string,
  token: string
) => {
    const response = await api.patch(
      `/update`,

      {
        name,
        personalNum,
        email,
        avatar
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
};

export const newToken = async (token: string) => {
    const response = await api.post(
      "/newToken",
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
};

export const forgotPassword = async (email: string) => {
    const response = await api.post("/forgot-password", {
      email
    });
    return response;
};

export const resetPassword = async (token: string, password: string) => {
    const response = await api.patch(
      "/update",
      {
        password
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
};
