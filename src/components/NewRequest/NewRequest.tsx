import useInput from "../../hooks/use-input";
import SelectOptions from "../SelectOptions/SelectOptions";
import { useEffect } from "react";
//@ts-ignore
import styles from "./NewRequest.module.css";

const TYPE_SORT_ARR = [
  { value: "All", text: "All" },
  { value: "Blackening", text: "Blackening" },
  { value: "Kidud", text: "Kidud" },
  { value: "Let me in", text: "Let me in" },
  { value: "Let me in by car or plane", text: "Let me in by car or plane" },
  { value: "Sign for me", text: "Sign for me" }
];

const MIN_LENGTH = 5;

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
    error
  } = props;

  const {
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: textBlurHandler
  } = useInput((value) => value.length >= MIN_LENGTH);

  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setRequestText(text);
    textChangeHandler(event);
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
      <SelectOptions
        name="Request type"
        value={selectedType}
        text="Request Type"
        setSort={setSelectedType}
        optionsArray={TYPE_SORT_ARR}
        classname={styles.select}
      />
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
      {error && <p className={styles["req-error"]}>{error}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default NewRequest;
