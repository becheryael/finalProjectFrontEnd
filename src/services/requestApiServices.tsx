import axios from "axios";

export const fetchRequests = async (
  token: string,
  date: string,
  status: string,
  type: string
) => {
  let statusSort;
  let typeSort;
  if (status !== "All" && status !== "none") {
    statusSort = `status=${status}`;
  } else {
    statusSort = "";
  }

  if (type !== "All" && type !== "none") {
    typeSort = `type=${type}`;
  } else {
    typeSort = "";
  }

  const url = `http://localhost:8000/requests?${statusSort}&${typeSort}&date=${date}`;
  try {
    const response = await axios({
      method: "get",
      url: url,
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createRequest = async (
  type: string,
  text: string,
  token: string
) => {
  const url = "http://localhost:8000/requests";
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        Authorization: token,
      },
      data: {
        type,
        text,
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
  type: string
) => {
  let statusSort;
  let typeSort;
  if (status !== "All" && status !== "none") {
    statusSort = `status=${status}`;
  } else {
    statusSort = "";
  }

  if (type !== "All" && type !== "none") {
    typeSort = `type=${type}`;
  } else {
    typeSort = "";
  }

  const url = `http://localhost:8000/requests/allRequests?${statusSort}&${typeSort}&date=${date}`;
  try {
    const response = await axios({
      method: "get",
      url: url,
      headers: {
        Authorization: token,
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
  const url = `http://localhost:8000/requests/${requestId}`;
  try {
    const response = await axios({
      method: "patch",
      url: url,
      headers: {
        Authorization: token
      },
      data: {
        status,
        message
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};