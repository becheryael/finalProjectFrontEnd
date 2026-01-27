import useInput from "../../hooks/use-input";
import { useImperativeHandle, Ref, useState } from "react";
//@ts-ignore
import styles from "./AuthInput.module.css";
//@ts-ignore
import openEyeImage from "../../assets/media/images/open-eye.png";
// @ts-ignore
import closedEyeImage from "../../assets/media/images/closed-eye.png";

export interface AuthInputHandle {
  resetInput: () => void;
}

interface authInputProps {
  inputTitle: string;
  inputType?: string;
  inputValue: string;
  errorText: string;
  checkIsValid: (value: string) => boolean;
  setInput: (value: string) => void;
  setIsValid: (value: boolean) => void;
  ref?: Ref<AuthInputHandle>;
  isNumOnly?: boolean;
  isPassword?: boolean;
}

const AuthInput = (props: authInputProps) => {
  const {
    inputTitle,
    inputType,
    inputValue,
    errorText,
    checkIsValid,
    setInput,
    setIsValid,
    ref,
    isNumOnly,
    isPassword = false
  } = props;
  const { hasError, valueChangeHandler, inputBlurHandler, reset } =
    useInput(checkIsValid);

  const [isShowPassword, setIsShowPassword] = useState(false);
  let type;
  if (isPassword) {
    if (!isShowPassword) {
      type = "password";
    } else {
      type = "text";
    }
  } else {
    type = inputType;
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumOnly) {
      const newChar = event.target.value.slice(-1);
      const isDigit = /^\d$/.test(newChar);
      if (isDigit || (event.target.value.length === 0 && newChar === "")) {
        setInput(event.target.value);
        valueChangeHandler(event);
      }
    } else {
      setInput(event.target.value);
      valueChangeHandler(event);
    }
    const currentValidity = checkIsValid(event.target.value);
    setIsValid(currentValidity);
  };

  useImperativeHandle(
    ref,
    () => ({
      resetInput: () => {
        reset();
        setInput("");
        setIsValid(false);
      }
    }),
    [reset, setInput, setIsValid]
  );

  const inputClasses = hasError
    ? `${styles["input"]} ${styles["invalid-input"]}`
    : styles["input"];

  return (
    <div className={styles["input-div"]}>
      <div className={styles["title-container"]}>
        <label>{inputTitle}</label>
        {isPassword && (
          <img
            src={isShowPassword ? openEyeImage : closedEyeImage}
            alt={isShowPassword ? "open eye" : "closed eye"}
            onClick={() => setIsShowPassword((prevIsShow) => !prevIsShow)}
            className={styles["eye-image"]}
          />
        )}
      </div>
      <input
        className={inputClasses}
        type={type}
        onChange={(event) => handleInput(event)}
        onBlur={inputBlurHandler}
        value={inputValue}
      />
      {hasError && <p className={styles["error-text"]}>{errorText}</p>}
    </div>
  );
};

export default AuthInput;
