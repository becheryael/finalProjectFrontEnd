import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";
import NewRequest from "../NewRequest/NewRequest";
import RequestsTable from "../RequestsTable/RequestsTable";
import SortingRequests from "../SortingRequests/SortingRequests";
import { useState, useContext, useEffect } from "react";
import { fetchRequests, createRequest } from "../../services/requestApiServices";
import { AxiosError } from "axios";
// @ts-ignore
import styles from "./UserRequests.module.css";
// @ts-ignore
import newImage from "../../assets/media/images/plus-button.png";

const UserRequests = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newRequestError, setNewRequestError] = useState<null | string>(null);
  const [isLoadingNewReq, setIsLoadingNewReq] = useState(false);
  const [requests, setRequests] = useState<null | []>(null);

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [isAddRequest, setIsAddRequest] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [selectedType, setSelectedType] = useState("none");

  const [sortByDate, setSortByDate] = useState("none");
  const [sortByStatus, setSortByStatus] = useState("none");
  const [sortByType, setSortByType] = useState("none");

  const getRequests = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetchRequests(
        authCtx.token!,
        sortByDate,
        sortByStatus,
        sortByType,
        ITEMS_PER_PAGE,
        currentPage
      );
      const bamRequests = res.data.requests;
      const requestCount = res.data.requestCount;
      setIsLoading(false);
      setRequests(bamRequests);
      setTotalItems(requestCount);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      setIsLoading(false);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    getRequests();
  }, [sortByDate, sortByStatus, sortByType, currentPage]);

  const handleNewRequest = async () => {
    setIsLoadingNewReq(true);
    try {
      const res = await createRequest(
        selectedType,
        requestText,
        authCtx.token!
      );
      const request = res.data;
      closeNewRequest();
      setIsLoadingNewReq(false);
      getRequests();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
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
          <RequestsTable
            requests={requests}
            totalItems={totalItems}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
      )}
    </div>
  );
};

export default UserRequests;
