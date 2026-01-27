import Request from "../Request/Request";
// @ts-ignore
import previousArrow from "../../assets/media/images/left-arrow.png";
// @ts-ignore
import nextArrow from "../../assets/media/images/right-arrow.png";
// @ts-ignore
import styles from "./RequestsTable.module.css";

interface requestTableProps {
  requests: [];
  isManager?: boolean;
  totalItems: number;
  ITEMS_PER_PAGE: number;
  setCurrentPage: (value: number) => void;
  currentPage: number;
}

const RequestsTable = (props: requestTableProps) => {
  const {
    requests,
    isManager = false,
    totalItems,
    ITEMS_PER_PAGE,
    currentPage,
    setCurrentPage
  } = props;

  const numOfPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const pages = [...Array(numOfPages).keys()];

  const HandlePreviousBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const HandleNextBtn = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <table className={styles["requests-table"]}>
        <thead>
          <tr>
            {isManager && <th></th>}
            {isManager && <th>Name</th>}
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
                isManager={isManager}
                user={request.owner.name}
                avatar={request.owner.avatar}
                requestType={request.type}
                requestText={request.text}
                requestDate={request.createdAt}
                requestStatus={request.status}
                requestId={request._id}
                requestMessage={request.message}
                key={request._id}
              />
            )
          )}
        </tbody>
      </table>
      <div className={styles["pagination"]}>
        {pages.length > 1 && (
          <img onClick={HandlePreviousBtn} src={previousArrow} alt="previous" />
        )}
        {pages.length > 1 &&
          pages.map((page, index) => (
            <button
              className={
                currentPage === page
                  ? `${styles["selected"]} ${styles["pagination-button"]}`
                  : styles["pagination-button"]
              }
              onClick={() => setCurrentPage(page)}
              key={index}
            >
              {page + 1}
            </button>
          ))}
        {pages.length > 1 && (
          <img onClick={HandleNextBtn} src={nextArrow} alt="next" />
        )}
      </div>
    </>
  );
};

export default RequestsTable;
