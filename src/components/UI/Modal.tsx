import ReactDOM from "react-dom";
import Card from "./Card";
// @ts-ignore
import styles from "./Modal.module.css";

interface backdropProps {
  onConfirm: () => void;
  onClose?: () => void;
}

const Backdrop = (props: backdropProps) => {
  return (
    <div
      className={styles.backdrop}
      onClick={props.onClose || props.onConfirm}
    />
  );
};

interface overlayProps {
  title: string;
  message?: string;
  onConfirm: () => void;
  confirmTxt: string;
  component?: React.ReactNode;
  isValid?: boolean;
}

const ModalOverlay = (props: overlayProps) => {
  const { isValid = true } = props;
  const buttonClasses = !isValid
    ? `${styles["invalid-button"]}`
    : styles["confirm-btn"];
  return (
    <Card classname={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        {props.message && <p>{props.message}</p>}
        {props.component}
      </div>
      <footer className={styles.actions}>
        <button
          type="button"
          onClick={props.onConfirm}
          className={buttonClasses}
          disabled={!isValid}
        >
          {props.confirmTxt}
        </button>
      </footer>
    </Card>
  );
};

interface modalProps {
  title: string;
  message?: string;
  onConfirm: () => void;
  onClose?: () => void;
  confirmTxt: string;
  component?: React.ReactNode;
  isValid?: boolean;
}

const Modal = (props: modalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} onClose={props.onClose} />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}
          confirmTxt={props.confirmTxt}
          component={props.component}
          isValid={props.isValid}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </>
  );
};

export default Modal;
