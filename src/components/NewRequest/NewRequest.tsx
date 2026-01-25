import useInput from "../../hooks/use-input";
import { useEffect } from "react";
//@ts-ignore
import styles from "./NewRequest.module.css";

interface newRequestProps {
  requestText: string;
  selectedType: string;
  setRequestText: (value: string) => void;
  setSelectedType: (value: string) => void;
  setFormIsValid: (value: boolean) => void;
  isLoading: boolean;
  error: null | string;
}

const NewRequest = (props: newRequestProps) => {
  const {
    requestText,
    selectedType,
    setRequestText,
    setSelectedType,
    setFormIsValid,
    isLoading,
    error,
  } = props;
  const MIN_LENGTH = 5;

  const {
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: textBlurHandler,
  } = useInput((value) => value.length >= MIN_LENGTH);

  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setRequestText(text);
    textChangeHandler(event);
  };

  const handleSelectionInput = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selection = event.target.value;
    setSelectedType(selection);
  };

  useEffect(() => {
    const isValid = requestText.length >= MIN_LENGTH && selectedType !== "none";
    setFormIsValid(isValid);
  }, [requestText, selectedType, setFormIsValid]);

  const textClasses = textHasError
    ? `${styles["text"]} ${styles["invalid-text"]}`
    : styles["text"];

  return (
    <div className={styles.container}>
      <select
        name="Request type"
        className={styles.select}
        value={selectedType}
        onChange={(event) => handleSelectionInput(event)}
      >
        <option value="none" disabled>
          Request Type
        </option>
        <option value="Blackening">Blackening</option>
        <option value="Kidud">Kidud</option>
        <option value="Let me in">Let me in</option>
        <option value="Let me in by car or plane">Let me in by car or plane</option>
        <option value="Sign for me">Sign for me</option>
      </select>
      <textarea
        className={textClasses}
        maxLength={500}
        placeholder="explain your request..."
        value={requestText}
        onChange={(event) => handleTextInput(event)}
        onBlur={textBlurHandler}
      ></textarea>
      {textHasError && (
        <p className={styles["error-text"]}>
          Please write a description for your request.
        </p>
      )}
      {error && (
        <p className={styles["req-error"]}>
          {error}
        </p>
      )}
      {isLoading && (
        <p>
          Loading...
        </p>
      )}
    </div>
  );
};

export default NewRequest;
