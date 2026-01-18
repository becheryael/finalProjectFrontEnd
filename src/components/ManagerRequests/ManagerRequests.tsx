import { fetchAllRequests } from "../../services/requestApiServices";
import SortingRequests from "../SortingRequests/SortingRequests";
import Request from "../Request/Request";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { AxiosError } from "axios";
//@ts-ignore
import styles from "./ManagerRequests.module.css";

const ManagerRequests = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<null | []>(null);

  const [sortByDate, setSortByDate] = useState("none");
  const [sortByStatus, setSortByStatus] = useState("none");
  const [sortByType, setSortByType] = useState("none");

  const getAllRequests = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetchAllRequests(
        authCtx.token!,
        sortByDate,
        sortByStatus,
        sortByType
      );
      const allRequests = res.data;
      setRequests(allRequests);
      setIsLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      console.log(errorMessage);
      setIsLoading(false);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, [sortByDate, sortByStatus, sortByType]);

  return (
    <div className={styles["requests-container"]}>
      <SortingRequests
        sortByDate={sortByDate}
        sortByStatus={sortByStatus}
        sortByType={sortByType}
        setSortByDate={setSortByDate}
        setSortByStatus={setSortByStatus}
        setSortByType={setSortByType}
      />
      {error && <p className={styles["error-message"]}>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!error && requests && (
        <table className={styles["requests-table"]}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type</th>
              <th>Request</th>
              <th>Date</th>
              <th>Status</th>
              <th>Status Message</th>
            </tr>
          </thead>
          <tbody>
            {requests!.map(
              (
                request: {
                  type: string;
                  text: string;
                  createdAt: string;
                  status: string;
                  _id: string;
                  message: string;
                  owner: { name: string; avatar: string };
                },
                index
              ) => (
                <Request
                  isManager={true}
                  user={request.owner.name}
                  avatar={request.owner.avatar}
                  requestType={request.type}
                  requestText={request.text}
                  requestDate={request.createdAt}
                  requestStatus={request.status}
                  requestId={request._id}
                  requestMessage={request.message}
                  key={index}
                />
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ManagerRequests;
