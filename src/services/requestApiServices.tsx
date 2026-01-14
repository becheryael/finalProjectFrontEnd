import axios from "axios";

export const fetchRequests = async (token: string) => {
  const url = "http://localhost:8000/request";
  try {
    const response = await axios({
      method: "get",
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