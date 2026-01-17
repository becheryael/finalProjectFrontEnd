import { useState } from "react";
//@ts-ignore
import styles from "./SortingRequests.module.css";

interface sortingRequestProps {
    sortByDate: string;
    sortByStatus: string;
    sortByType: string;
    setSortByDate: (value: string) => void;
    setSortByStatus: (value: string) => void;
    setSortByType: (value: string) => void;
}

const SortingRequests = (props: sortingRequestProps) => {
    const {sortByDate, sortByStatus, sortByType, setSortByDate, setSortByStatus, setSortByType} = props

  const handleDateSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByDate(event.target.value);
    handleSorting();
  };

  const handleStatusSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByStatus(event.target.value);
    handleSorting();
  };

  const handleTypeSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByType(event.target.value);
    handleSorting();
  };

  const handleSorting = () => {

  }

  return (
    <div className={styles["select-contianer"]}>
      <select
        name="Date sort"
        className={styles.select}
        value={sortByDate}
        onChange={(event) => handleDateSorting(event)}
      >
        <option value="none" disabled>
          Sort by date
        </option>
        <option value="newist">Newist to oldest</option>
        <option value="oldest">Oldest to newist</option>
      </select>
      <select
        name="Status sort"
        className={styles.select}
        value={sortByStatus}
        onChange={(event) => handleStatusSorting(event)}
      >
        <option value="none" disabled>
          Sort by status
        </option>
        <option value="All">All</option>
        <option value="Approved">Approved</option>
        <option value="Awaiting approval">Awaiting approval</option>
        <option value="Denied">Denied</option>
      </select>
      <select
        name="Status sort"
        className={styles.select}
        value={sortByType}
        onChange={(event) => handleTypeSorting(event)}
      >
        <option value="none" disabled>
          Sort by type
        </option>
        <option value="All">All</option>
        <option value="Blackening">Blackening</option>
        <option value="Kidud">Kidud</option>
        <option value="Let me in">Let me in</option>
        <option value="Let me in by car or plane">
          Let me in by car or plane
        </option>
        <option value="Sign for me">Sign for me</option>
      </select>
    </div>
  );
};
export default SortingRequests;
