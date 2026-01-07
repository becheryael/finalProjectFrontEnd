// @ts-ignore
import styles from "./Requests.module.css";
import Request from "../Request/Request";

const Requests = () => {
  return (
    <div className={styles['requests-container']}>
        <Request requestName="name" requestDate={new Date()} requestType="type" />
    </div>
  );
};

export default Requests;
