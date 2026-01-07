import ReactDOM from "react-dom";
import Card from "./Card";
// @ts-ignore
import styles from "./Modal.module.css";

interface backdropProps {
  onConfirm: () => void;
}

const Backdrop = (props: backdropProps) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

interface overlayProps {
  title: string;
  message?: string;
  onConfirm: () => void;
  confirmTxt: string;
  component?: React.ReactNode;
}

const ModalOverlay = (props: overlayProps) => {
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
          className={styles["confirm-btn"]}
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
  confirmTxt: string;
  component?: React.ReactNode
}

const Modal = (props: modalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}
          confirmTxt={props.confirmTxt}
          component={props.component}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </>
  );
};

export default Modal;
