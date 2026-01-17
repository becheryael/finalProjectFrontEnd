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
  const {
    sortByDate,
    sortByStatus,
    sortByType,
    setSortByDate,
    setSortByStatus,
    setSortByType,
  } = props;

  return (
    <div className={styles["select-contianer"]}>
      <select
        name="Date sort"
        className={styles.select}
        value={sortByDate}
        onChange={(event) => setSortByDate(event.target.value)}
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
        onChange={(event) => setSortByStatus(event.target.value)}
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
        name="Type sort"
        className={styles.select}
        value={sortByType}
        onChange={(event) => setSortByType(event.target.value)}
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
