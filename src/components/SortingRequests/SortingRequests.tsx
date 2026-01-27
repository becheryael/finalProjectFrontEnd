import DateRangeCalander from "../DateRangeCalander/DateRangeCalander";
import SortingSelect from "../SortingSelect/SortingSelect";
import { useState } from "react";
//@ts-ignore
import styles from "./SortingRequests.module.css";
//@ts-ignore
import searchIcon from "../../assets/media/images/search-icon.png";
//@ts-ignore
import calendarIcon from "../../assets/media/images/calendar.png";

interface sortingRequestProps {
  sortByDate: string;
  filterByStatus: string;
  filterByType: string;
  setSortByDate: (value: string) => void;
  setfilterByStatus: (value: string) => void;
  setfilterByType: (value: string) => void;
  isManager?: boolean;
  fetchByUser?: string;
  setFetchByUser?: (value: string) => void;
  handleSearch?: (event: React.FormEvent<HTMLFormElement>) => void;
  startDate?: Date | null;
  endDate?: Date | null;
  setStartDate?: (value: Date | null) => void;
  setEndDate?: (value: Date | null) => void;
  getAllRequests?: (start: string, end: string) => void;
}

const SortingRequests = (props: sortingRequestProps) => {
  const {
    sortByDate,
    filterByStatus,
    filterByType,
    setSortByDate,
    setfilterByStatus,
    setfilterByType,
    isManager = false,
    fetchByUser,
    setFetchByUser,
    handleSearch,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    getAllRequests
  } = props;

  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const dateSortArr = [
    { value: "newest", text: "Newest to oldest" },
    { value: "oldest", text: "Oldest to newest" }
  ];
  const statusSortArr = [
    { value: "All", text: "All" },
    { value: "Approved", text: "Approved" },
    { value: "Awaiting approval", text: "Awaiting approval" },
    { value: "Denied", text: "Denied" }
  ];
  const typeSortArr = [
    { value: "All", text: "All" },
    { value: "Blackening", text: "Blackening" },
    { value: "Kidud", text: "Kidud" },
    { value: "Let me in", text: "Let me in" },
    { value: "Let me in by car or plane", text: "Let me in by car or plane" },
    { value: "Sign for me", text: "Sign for me" }
  ];

  return (
    <div className={styles["select-contianer"]}>
      <SortingSelect
        name="Date sort"
        text="Sort by date"
        value={sortByDate}
        setSort={setSortByDate}
        optionsArray={dateSortArr}
      />
      <SortingSelect
        name="Status sort"
        text="Filter by status"
        value={filterByStatus}
        setSort={setfilterByStatus}
        optionsArray={statusSortArr}
      />
      <SortingSelect
        name="Type sort"
        text="Filter by type"
        value={filterByType}
        setSort={setfilterByType}
        optionsArray={typeSortArr}
      />
      {isManager && (
        <form onSubmit={handleSearch} className={styles["search-form"]}>
          <input
            value={fetchByUser}
            onChange={(event) => setFetchByUser!(event.target.value)}
            placeholder="Search by user..."
            className={styles["search"]}
          ></input>
          <button type="submit" className={styles["search-btn"]}>
            <img src={searchIcon} alt="search" />
          </button>
        </form>
      )}
      {isManager && (
        <img
          src={calendarIcon}
          alt="calander"
          className={styles.calendar}
          onClick={() =>
            setIsShowCalendar((prevShowCalender) => !prevShowCalender)
          }
        />
      )}
      {isManager && isShowCalendar && (
        <DateRangeCalander
          startDate={startDate!}
          endDate={endDate!}
          setStartDate={setStartDate!}
          setEndDate={setEndDate!}
          getAllRequests={getAllRequests!}
          setIsShowCalendar={setIsShowCalendar}
        />
      )}
    </div>
  );
};
export default SortingRequests;
