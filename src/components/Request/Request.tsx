// @ts-ignore
import styles from "./Request.module.css";
//@ts-ignore
import beaverAvatar from "../../assets/media/images/beaverAvatar.png";
//@ts-ignore
import deerAvatar from "../../assets/media/images/deerAvatar.png";
//@ts-ignore
import koalaAvatar from "../../assets/media/images/koalaAvatar.png";
//@ts-ignore
import raccoonAvatar from "../../assets/media/images/raccoonAvatar.png";

interface requestProps {
  user?: string;
  avatar?: string;
  requestText: string;
  requestType: string;
  requestDate: string;
  requestStatus: string;
}

const Request = (props: requestProps) => {
  const { user, avatar, requestText, requestType, requestDate, requestStatus } = props;
  const dateObj = new Date(requestDate);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let statusClasses;
  if (requestStatus === "Awaiting approval") {
    statusClasses = styles["waiting"];
  } else if (requestStatus === "Approved") {
    statusClasses = styles["approved"];
  } else {
    statusClasses = styles["denied"];
  }

  return (
    <tr>
      {avatar && (
        <td>
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
      <td className={statusClasses}>{requestStatus}</td>
    </tr>
  );
};

export default Request;
