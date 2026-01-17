import AuthContext from "../../store/auth-context";
import Request from "../Request/Request";
import Modal from "../UI/Modal";
import NewRequest from "../NewRequest/NewRequest";
import SortingRequests from "../SortingRequests/SortingRequests";
import { useState, useContext, useEffect } from "react";
import { fetchRequests, createRequest } from "../../services/requestApiServices";
import { AxiosError } from "axios";
// @ts-ignore
import styles from "./UserRequests.module.css";
// @ts-ignore
import newImage from "../../assets/media/images/new.png";

const UserRequests = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState<null | string>(null);
  const [newRequestError, setNewRequestError] = useState<null | string>(null);
  const [isLoadingNewReq, setIsLoadingNewReq] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<null | []>(null);
  const [isAddRequest, setIsAddRequest] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [selectedType, setSelectedType] = useState("none");

  const [sortByDate, setSortByDate] = useState("none");
  const [sortByStatus, setSortByStatus] = useState("none");
  const [sortByType, setSortByType] = useState("none");
  console.log("reload");

  const getRequests = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetchRequests(
        authCtx.token!,
        sortByDate,
        sortByStatus,
        sortByType
      );
      const bamRequests = res.data;
      console.log(bamRequests);
      setIsLoading(false);
      setRequests(bamRequests);
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
    getRequests();
  }, [sortByDate, sortByStatus, sortByType]);

  const handleNewRequest = async () => {
    setIsLoadingNewReq(true);
    try {
      const res = await createRequest(
        selectedType,
        requestText,
        authCtx.token!
      );
      const req = res.data;
      console.log(req);
      closeNewRequest();
      setIsLoadingNewReq(false);
      getRequests();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      console.log(errorMessage);
      setIsLoadingNewReq(false);
      setNewRequestError(errorMessage);
    }
  };

  const closeNewRequest = () => {
    setRequestText("");
    setSelectedType("none");
    setIsAddRequest(false);
  };

  return (
    <div className={styles["requests-container"]}>
      <button
        className={styles["new-btn"]}
        onClick={(event) => setIsAddRequest(true)}
      >
        <img src={newImage} />
        Create new request
      </button>
      {isAddRequest && (
        <Modal
          title="New Request"
          onConfirm={handleNewRequest}
          onClose={closeNewRequest}
          confirmTxt="Send"
          isValid={formIsValid}
          component={
            <NewRequest
              requestText={requestText}
              selectedType={selectedType}
              setRequestText={setRequestText}
              setSelectedType={setSelectedType}
              setFormIsValid={setFormIsValid}
              isLoading={isLoadingNewReq}
              error={newRequestError}
            />
          }
        />
      )}
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
        <>
          <table className={styles["requests-table"]}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Request</th>
                <th>Date</th>
                <th>Status</th>
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
                  },
                  index
                ) => (
                  <Request
                    requestType={request.type}
                    requestText={request.text}
                    requestDate={request.createdAt}
                    requestStatus={request.status}
                    key={index}
                  />
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserRequests;
