import { useState, useContext } from "react";
import { editRequest } from "../../services/requestApiServices";
import { AxiosError } from "axios";
import Modal from "../UI/Modal";
import AuthContext from "../../store/auth-context";
import RequestDeny from "../RequestDeny/RequestDeny";
// @ts-ignore
import styles from "./Request.module.css";
//@ts-ignore
import beaverAvatar from "../../assets/media/images/beaver-avatar.png";
//@ts-ignore
import deerAvatar from "../../assets/media/images/deer-avatar.png";
//@ts-ignore
import koalaAvatar from "../../assets/media/images/koala-avatar.png";
//@ts-ignore
import raccoonAvatar from "../../assets/media/images/raccoon-avatar.png";

interface requestProps {
  isManager?: boolean;
  user?: string;
  avatar?: string;
  requestText: string;
  requestType: string;
  requestDate: string;
  requestStatus: string;
  requestMessage: string;
  requestId: string;
}

const Request = (props: requestProps) => {
  const {
    user,
    avatar,
    requestText,
    requestType,
    requestDate,
    requestStatus,
    requestId,
    isManager = false,
    requestMessage,
  } = props;
  const authCtx = useContext(AuthContext);
  const dateObj = new Date(requestDate);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [status, setStatus] = useState(requestStatus);
  const [message, setMessage] = useState(requestMessage);
  const [isDenying, setisDenying] = useState(false);
  const [denyText, setDenyText] = useState("");
  const [isDenyFormValid, setIsDenyFormValid] = useState(false);
  const [isDenyLoading, setIsDenyLoading] = useState(false);
  const [denyError, setDenyError] = useState<null | string>(null);

  let statusClasses;
  if (status === "Awaiting approval") {
    statusClasses = styles["waiting"];
  } else if (status === "Approved") {
    statusClasses = styles["approved"];
  } else {
    statusClasses = styles["denied"];
  }

  const handleApprove = async () => {
    try {
      const res = await editRequest(authCtx.token!, requestId, "Approved");
      setStatus(res.data.status);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      alert(errorMessage);
    }
  };

  const handleDeny = async () => {
    setDenyError(null);
    setIsDenyLoading(true);
    try {
      const res = await editRequest(
        authCtx.token!,
        requestId,
        "Denied",
        denyText
      );
      setMessage(res.data.message);
      setStatus(res.data.status);
      setIsDenyLoading(false);
      closeDeny();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      console.log(errorMessage);
      setIsDenyLoading(false);
      setDenyError(errorMessage);
    }
  };

  const closeDeny = () => {
    setDenyText("");
    setisDenying(false);
  };

  return (
    <>
      {isDenying && (
        <Modal
          title="Give reason for denying request"
          confirmTxt="Deny"
          onConfirm={handleDeny}
          isValid={isDenyFormValid}
          onClose={closeDeny}
          component={
            <RequestDeny
              denyText={denyText}
              setDenyText={setDenyText}
              setFormIsValid={setIsDenyFormValid}
              error={denyError}
              isLoading={isDenyLoading}
            />
          }
        ></Modal>
      )}
      <tr>
        {avatar && (
          <td className={styles["avatar-container"]}>
            {avatar === "koala" && (
              <img src={koalaAvatar} className={styles["avatar"]} />
            )}
            {avatar === "deer" && (
              <img src={deerAvatar} className={styles["avatar"]} />
            )}
            {avatar === "beaver" && (
              <img src={beaverAvatar} className={styles["avatar"]} />
            )}
            {avatar === "raccoon" && (
              <img src={raccoonAvatar} className={styles["avatar"]} />
            )}
          </td>
        )}
        {user && (
          <td>
            <div>{user}</div>
          </td>
        )}
        <td>
          <div>{requestType}</div>
        </td>
        <td>
          <div>{requestText}</div>
        </td>
        <td>
          <div>{dateStr}</div>
        </td>
        {!isManager && <td className={statusClasses}>{status}</td>}
        {isManager &&
          (status === "Denied" || status === "Approved" ? (
            <td className={statusClasses}>{status}</td>
          ) : (
            <td>
              <div className={styles["btn-container"]}>
                <button
                  className={`${styles["table-btn"]} ${styles["approved"]}`}
                  onClick={handleApprove}
                >
                  Approve
                </button>
                <button
                  onClick={(event) => setisDenying(true)}
                  className={`${styles["table-btn"]} ${styles["denied"]}`}
                >
                  Deny
                </button>
              </div>
            </td>
          ))}
        <td>
          <div>{message}</div>
        </td>
      </tr>
    </>
  );
};

export default Request;
