import { useState } from "react";
// @ts-ignore
import styles from "./Request.module.css";

interface requestProps {
  requestText: string;
  requestType: string;
  requestDate: string;
  requestStatus: string;
}

const Request = (props: requestProps) => {
  const { requestText, requestType, requestDate, requestStatus } = props;
  let approvedTxt: string;

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
