// @ts-ignore
import styles from "./Card.module.css";
import { ReactNode } from "react";

interface cardProps {
  classname?: string;
  children: ReactNode;
}

const Card = (props: cardProps) => {
  return (
    <div className={`${styles.card} ${props.classname}`}>{props.children}</div>
  );
};

export default Card;
