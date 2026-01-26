import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/users",
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
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
  try {
    const response = await api.post("/create", {
      email,
      password,
      personalNum,
      name,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (token: string) => {
  try {
    const response = await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
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
  try {
    const response = await api.patch(
      `/${id}`,
      {
        name,
        personalNum,
        email,
        avatar,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const newToken = async (token: string) => {
  try {
    const response = await api.post(
      "/newToken",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/forgot-password", {
      email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const response = await api.patch(
      "/reset-password",
      {
        password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
