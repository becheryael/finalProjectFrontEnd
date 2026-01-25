//@ts-ignore
import styles from "./SortingRequests.module.css";
//@ts-ignore
import searchIcon from "../../assets/media/images/search-icon.png";

interface sortingRequestProps {
  sortByDate: string;
  sortByStatus: string;
  sortByType: string;
  setSortByDate: (value: string) => void;
  setSortByStatus: (value: string) => void;
  setSortByType: (value: string) => void;
  isManager?: boolean;
  fetchByUser?: string;
  setFetchByUser?: (value: string) => void;
  handleSearch?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SortingRequests = (props: sortingRequestProps) => {
  const {
    sortByDate,
    sortByStatus,
    sortByType,
    setSortByDate,
    setSortByStatus,
    setSortByType,
    isManager = false,
    fetchByUser,
    setFetchByUser,
    handleSearch
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
        Filter by status
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
          Filter by type
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
      {isManager && (
        <form onSubmit={handleSearch} className={styles['search-form']}>
          <input
            value={fetchByUser}
            onChange={(event) => setFetchByUser!(event.target.value)}
            placeholder="Search by user..."
            className={styles['search']}
          ></input>
          <button type="submit" className={styles['search-btn']} >
            <img src={searchIcon} alt="search" />
          </button>
        </form>
      )}
    </div>
  );
};
export default SortingRequests;
