import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/requests",
});

export const createRequest = async (
  type: string,
  text: string,
  token: string
) => {
  try {
    const response = await api.post(
      "",
      { type, text },
      { headers: { Authorization: token } }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchRequests = async (
  token: string,
  date: string,
  status: string,
  type: string,
  limit: number,
  skip: number
) => {
  try {
    const response = await api.get("", {
      headers: {
        Authorization: token,
      },
      params: {
        status: status !== "All" && status !== "none" ? status : undefined,
        type: type !== "All" && type !== "none" ? type : undefined,
        date,
        limit,
        skip,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchAllRequests = async (
  token: string,
  date: string,
  status: string,
  type: string,
  user: string,
  limit: number,
  skip: number,
  startDate?: string,
  endDate?: string
) => {
  try {
    const response = await api.get("/allRequests", {
      headers: {
        Authorization: token,
      },
      params: {
        status: status !== "All" && status !== "none" ? status : undefined,
        type: type !== "All" && type !== "none" ? type : undefined,
        userSearch: user || undefined,
        date,
        limit,
        skip,
        startDate,
        endDate,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editRequest = async (
  token: string,
  requestId: string,
  status: string,
  message?: string
) => {
  try {
    const response = await api.patch(
      `/${requestId}`,
      {
        status,
        message,
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
