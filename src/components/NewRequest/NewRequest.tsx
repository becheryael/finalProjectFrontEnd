import useInput from "../../hooks/use-input";
import { useState } from "react";
//@ts-ignore
import styles from "./NewRequest.module.css";

interface newRequestProps {
  isValid: boolean;
  setIsValid: (value: boolean) => void;
  setFormIsValid: (value: boolean) => void;
}

const NewRequest = (props: newRequestProps) => {
  const { isValid, setIsValid, setFormIsValid } = props;
  const MIN_LENGTH = 5;
  const [requestText, setRequestText] = useState("");
  const [selectedType, setSelectedType] = useState("none");
  const {
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: textBlurHandler
  } = useInput((value) => value.length >= MIN_LENGTH);

  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestText(event.target.value);
    textChangeHandler(event);
  };

  if (isValid && selectedType !== "none") {
    setFormIsValid(true);
  } else {
    setFormIsValid(false);
  }

  const textClasses = textHasError
    ? `${styles["text"]} ${styles["invalid-text"]}`
    : styles["text"];

  return (
    <div className={styles.container}>
      <select
        name="Request type"
        className={styles.select}
        value={selectedType}
        onChange={(event) => setSelectedType(event.target.value)}
      >
        <option value="none" disabled>
          Request Type
        </option>
        <option value="black">Blackening</option>
        <option value="kidud">Kidud</option>
        <option value="inside">Let me in</option>
        <option value="inCar">Let me in by car or plane</option>
        <option value="sign">Sign for me</option>
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
    </div>
  );
};

export default NewRequest;
