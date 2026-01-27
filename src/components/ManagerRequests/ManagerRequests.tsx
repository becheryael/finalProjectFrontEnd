import SortingRequests from "../SortingRequests/SortingRequests";
import RequestsTable from "../RequestsTable/RequestsTable";
import AuthContext from "../../store/auth-context";
import { fetchAllRequests } from "../../services/requestApiServices";
import React, { useState, useContext, useEffect, useCallback } from "react";
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

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const getAllRequests = useCallback(
    async (rangeStart?: string, rangeEnd?: string) => {
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
          currentPage,
          rangeStart,
          rangeEnd
        );
        const allRequests = res.data.allRequests;
        const requestCount = res.data.requestCount;
        setRequests(allRequests);
        setTotalItems(requestCount);
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.data as string;
        setError(errorMessage);
      }
      setIsLoading(false);
    },
    [
      authCtx.token,
      sortByDate,
      sortByStatus,
      sortByType,
      fetchByUser,
      currentPage
    ]
  );

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getAllRequests();
  };

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
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        getAllRequests={getAllRequests}
      />
      {error && <p className={styles["error-message"]}>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!error && requests && !isLoading && (
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
