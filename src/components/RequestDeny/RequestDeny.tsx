import useInput from "../../hooks/use-input";
//@ts-ignore
import styles from "./RequestDeny.module.css";

const MIN_LENGTH = 5;

interface requestDenyProps {
  denyText: string;
  setDenyText: (value: string) => void;
  setFormIsValid: (value: boolean) => void;
  isLoading: boolean;
  error: null | string;
}

const RequestDeny = (props: requestDenyProps) => {
  const { denyText, setDenyText, setFormIsValid, isLoading, error } = props;
  const {
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: textBlurHandler
  } = useInput((value) => value.length >= MIN_LENGTH);

  const textClasses = textHasError
    ? `${styles["text"]} ${styles["invalid-text"]}`
    : styles["text"];

  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setDenyText(text);
    textChangeHandler(event);
    const isValid = denyText.length >= MIN_LENGTH;
    setFormIsValid(isValid);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={textClasses}
        maxLength={500}
        placeholder="explain your reson for denyal..."
        value={denyText}
        onChange={(event) => handleTextInput(event)}
        onBlur={textBlurHandler}
      ></textarea>
      {textHasError && (
        <p className={styles["error-text"]}>
          Please write a description for your request.
        </p>
      )}
      {error && <p className={styles["req-error"]}>{error}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default RequestDeny;
