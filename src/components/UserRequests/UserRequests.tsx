import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";
import NewRequest from "../NewRequest/NewRequest";
import RequestsTable from "../RequestsTable/RequestsTable";
import SortingRequests from "../SortingRequests/SortingRequests";
import { useState, useContext, useEffect, useCallback } from "react";
import {
  fetchRequests,
  createRequest
} from "../../services/requestApiServices";
import { AxiosError } from "axios";
// @ts-ignore
import styles from "./UserRequests.module.css";
// @ts-ignore
import newImage from "../../assets/media/images/plus-button.png";

const ITEMS_PER_PAGE = 8;

const UserRequests = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newRequestError, setNewRequestError] = useState<null | string>(null);
  const [isLoadingNewReq, setIsLoadingNewReq] = useState(false);
  const [requests, setRequests] = useState<null | []>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [isAddRequest, setIsAddRequest] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [selectedType, setSelectedType] = useState("none");

  const [sortByDate, setSortByDate] = useState("none");
  const [filterByStatus, setfilterByStatus] = useState("none");
  const [filterByType, setfilterByType] = useState("none");

  const getRequests = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetchRequests(
        authCtx.token!,
        sortByDate,
        filterByStatus,
        filterByType,
        ITEMS_PER_PAGE,
        currentPage
      );
      const bamRequests = res.data.requests;
      const requestCount = res.data.requestCount;
      setRequests(bamRequests);
      setTotalItems(requestCount);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unable to get requests data");
      }
    }
    setIsLoading(false);
  }, [sortByDate, filterByStatus, filterByType, currentPage, authCtx.token]);

  useEffect(() => {
    getRequests();
  }, [sortByDate, filterByStatus, filterByType, currentPage, getRequests]);

  const handleNewRequest = async () => {
    setIsLoadingNewReq(true);
    try {
      await createRequest(selectedType, requestText, authCtx.token!);
      closeNewRequest();
      getRequests();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      setNewRequestError(errorMessage);
    }
    setIsLoadingNewReq(false);
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
        onClick={() => setIsAddRequest(true)}
      >
        <img src={newImage} alt="plus" />
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
        filterByStatus={filterByStatus}
        filterByType={filterByType}
        setSortByDate={setSortByDate}
        setfilterByStatus={setfilterByStatus}
        setfilterByType={setfilterByType}
      />
      {error && <p className={styles["error-message"]}>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!error && requests && !isLoading && (
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
