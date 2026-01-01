// @ts-ignore
import styles from "./Request.module.css";

interface requestProps {
  requestName: string;
  requestType: string;
  requestDate: Date;
}

const Request = (props: requestProps) => {
  const { requestName, requestType, requestDate } = props;
  const dateStr = requestDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className={styles.request}>
      <p>{requestName}</p>
      <p>{requestType}</p>
      <p>{dateStr}</p>
    </div>
  );
};

export default Request;
