import AuthContext from "../../store/auth-context";
import Request from "../Request/Request";
import Modal from "../UI/Modal";
import NewRequest from "../NewRequest/NewRequest";
import { useState, useContext, useEffect } from "react";
import { fetchRequests } from "../../services/requestApiServices";
import { AxiosError } from "axios";
// @ts-ignore
import styles from "./Requests.module.css";
// @ts-ignore
import newImage from "../../assets/media/images/new.png";

const Requests = () => {
  const [error, setError] = useState<null | string>(null);
  const [requests, setRequests] = useState<null | []>(null);
  const [isAddRequest, setIsAddRequest] = useState(false);
  const authCtx = useContext(AuthContext);
  const [NewRequestIsValid, setNewRequestIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  console.log("reload");
  // let bamRequests: {title: string, createdAt: string, type: string}[];
  const getRequests = async () => {
    try {
      const res = await fetchRequests(authCtx.token!);
      const bamRequests = res.data;
      console.log(bamRequests[0]);
      // bamRequests.map((request, index) => {
      //   console.log(request)
      // })
      setRequests(bamRequests);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      console.log(errorMessage);
      // setError(errorMessage)
    }
  };
  useEffect(() => {
    getRequests();
  }, []);

  const handleNewRequest = () => {};

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
          confirmTxt="Send"
          component={
            <NewRequest
              isValid={NewRequestIsValid}
              setIsValid={setNewRequestIsValid}
              setFormIsValid={setFormIsValid}
            />
          }
        />
      )}
      {error && <p className={styles["error-message"]}>{error}</p>}
      {!error && requests && (
        <>
          <table className={styles["requests-table"]}>
            <thead>
              <tr>
                <th>Request</th>
                <th>Type</th>
                <th>Date</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {requests!.map(
                (
                  request: {
                    title: string;
                    createdAt: string;
                    type: string;
                    approved: boolean;
                  },
                  index
                ) => (
                  <Request
                    requestTitle={request.title}
                    requestType={request.type}
                    requestDate={request.createdAt}
                    isApproved={request.approved}
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

export default Requests;
