import axios from "axios";

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

export const createUser = async (email: string, password: string, personalNum: string, name: string) => {
    const url = "http://localhost:8000/users/create";
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: {
          email,
          password,
          personalNum,
          name
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
