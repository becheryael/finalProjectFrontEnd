import { useState, useContext, useEffect } from "react";
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

const AVATARS: Record<string, string> = {
  koala: koalaAvatar,
  deer: deerAvatar,
  beaver: beaverAvatar,
  raccoon: raccoonAvatar
};

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
    requestMessage
  } = props;
  const authCtx = useContext(AuthContext);
  const dateObj = new Date(requestDate);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const [status, setStatus] = useState(requestStatus);
  const [message, setMessage] = useState(requestMessage);
  const [isDenying, setisDenying] = useState(false);
  const [denyText, setDenyText] = useState("");
  const [isDenyFormValid, setIsDenyFormValid] = useState(false);
  const [isDenyLoading, setIsDenyLoading] = useState(false);
  const [denyError, setDenyError] = useState<null | string>(null);

  useEffect(() => {
    setStatus(requestStatus);
    setMessage(requestMessage);
  }, [requestStatus, requestMessage]);

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
      closeDeny();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      setDenyError(errorMessage);
    }
    setIsDenyLoading(false);
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
            <img
              src={AVATARS[avatar]}
              alt={avatar}
              className={styles["avatar"]}
            />
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
        {!isManager || status !== "Awaiting approval" ? (
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
                onClick={() => setisDenying(true)}
                className={`${styles["table-btn"]} ${styles["denied"]}`}
              >
                Deny
              </button>
            </div>
          </td>
        )}
        <td>
          <div>{message}</div>
        </td>
      </tr>
    </>
  );
};

export default Request;
