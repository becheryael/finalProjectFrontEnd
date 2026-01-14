import { useState } from "react";
// @ts-ignore
import styles from "./Request.module.css";

interface requestProps {
  requestTitle: string;
  requestType: string;
  requestDate: string;
  isApproved: boolean;
}

const Request = (props: requestProps) => {
  const { requestTitle, requestType, requestDate, isApproved } = props;
  let approvedTxt: string;
  if (isApproved) {
    approvedTxt = 'Approved';
  } else {
    approvedTxt = 'Denied';
  }
  const dateObj = new Date(requestDate);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const approvedClasses = isApproved
      ? styles["approved"]
      : styles["denied"];

  return (
  <tr>
    <td>{requestTitle}</td>
    <td>{requestType}</td>
    <td>{dateStr}</td>
    <td className={approvedClasses}>{approvedTxt}</td>
  </tr>
  );
};

export default Request;
