import SortingRequests from "../SortingRequests/SortingRequests";
import RequestsTable from "../RequestsTable/RequestsTable";
import AuthContext from "../../store/auth-context";
import { fetchAllRequests } from "../../services/requestApiServices";
import React, { useState, useContext, useEffect } from "react";
import { AxiosError } from "axios";
//@ts-ignore
import styles from "./ManagerRequests.module.css";

const ManagerRequests = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<null | []>(null);

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [sortByDate, setSortByDate] = useState("none");
  const [sortByStatus, setSortByStatus] = useState("none");
  const [sortByType, setSortByType] = useState("none");
  const [fetchByUser, setfetchByUser] = useState("");

  const getAllRequests = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetchAllRequests(
        authCtx.token!,
        sortByDate,
        sortByStatus,
        sortByType,
        fetchByUser,
        ITEMS_PER_PAGE,
        currentPage
      );
      const allRequests = res.data.allRequests;
      const requestCount = res.data.requestCount;
      setRequests(allRequests);
      setTotalItems(requestCount);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      console.log(errorMessage);
      setError(errorMessage);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllRequests();
  }, [sortByDate, sortByStatus, sortByType, currentPage]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getAllRequests();
  }

  return (
    <div className={styles["requests-container"]}>
      <SortingRequests
        sortByDate={sortByDate}
        sortByStatus={sortByStatus}
        sortByType={sortByType}
        setSortByDate={setSortByDate}
        setSortByStatus={setSortByStatus}
        setSortByType={setSortByType}
        isManager={true}
        fetchByUser={fetchByUser}
        setFetchByUser={setfetchByUser}
        handleSearch={handleSearch}
      />
      {error && <p className={styles["error-message"]}>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!error && requests && (
        <RequestsTable
          requests={requests}
          isManager={true}
          totalItems={totalItems}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};
export default ManagerRequests;
