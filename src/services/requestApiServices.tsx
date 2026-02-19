import axios from "axios";

const api = axios.create({
  // MICHAL: את סתם מוסיפה עוד שדות לenv. תכתבי אחד שהוא הקישור לשרת שלך ותשרשרי את הroute שאת צריכה באותו זמן
  baseURL: process.env.REACT_APP_BASE_REQUEST_ROUTE
});

export const createRequest = async (
  type: string,
  text: string,
  token: string
) => {
    const response = await api.post(
      "",
      { type, text },
      { headers: { Authorization: token } }
    );
    return response;
};

export const fetchRequests = async (
  token: string,
  date: string,
  status: string,
  type: string,
  limit: number,
  skip: number
) => {
    const response = await api.get("", {
      headers: {
        Authorization: token
      },
      params: {
        status: status !== "All" && status !== "none" ? status : undefined,
        type: type !== "All" && type !== "none" ? type : undefined,
        date: date !== "none" ? date : undefined,
        limit,
        skip
      }
    });
    return response;
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
    const response = await api.get("/allRequests", {
      headers: {
        Authorization: token
      },
      params: {
        status: status !== "All" && status !== "none" ? status : undefined,
        type: type !== "All" && type !== "none" ? type : undefined,
        userSearch: user || undefined,
        date: date !== "none" ? date : undefined,
        limit,
        skip,
        startDate,
        endDate
      }
    });
    return response;
};

export const editRequest = async (
  token: string,
  requestId: string,
  status: string,
  message?: string
) => {
    const response = await api.patch(
      `/${requestId}`,
      {
        status,
        message
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
};
