import useInput from "../../hooks/use-input";
import { useImperativeHandle, Ref } from "react";
//@ts-ignore
import styles from "./UserInfoField.module.css";

export interface InputHandle {
  resetInput: () => void;
}

interface authInputProps {
  title: string;
  inputType?: string;
  value: string;
  errorText: string;
  isEdit: boolean;
  setIsValid: (value: boolean) => void;
  setInput: (value: string) => void;
  checkIsValid: (value: string) => boolean;
  ref: Ref<InputHandle>;
  isNumOnly?: boolean;
}

const UserInfoField = (props: authInputProps) => {
  const {
    title,
    inputType,
    value,
    errorText,
    checkIsValid,
    setInput,
    setIsValid,
    ref,
    isNumOnly,
    isEdit,
  } = props;
  const { hasError, valueChangeHandler, inputBlurHandler, reset } = useInput(
    checkIsValid,
    value
  );

  //   const [isShowPassword, setIsShowPassword] = useState(false);
  //   let type;
  //   if (title === "Password") {
  //     if (!isShowPassword) {
  //       type = "password";
  //     } else {
  //       type = "text";
  //     }
  //   } else {
  const type = inputType;
  //   }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumOnly) {
      const newChar = event.target.value.slice(-1);
      const isDigit = /^\d$/.test(newChar);
      if (isDigit || (event.target.value.length === 0 && newChar === "")) {
        setInput(event.target.value);
        valueChangeHandler(event);
        const currentValidity = checkIsValid(event.target.value);
        setIsValid(currentValidity);
      }
    } else {
      setInput(event.target.value);
      valueChangeHandler(event);
      const currentValidity = checkIsValid(event.target.value);
      setIsValid(currentValidity);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      resetInput: () => {
        setIsValid(true);
        reset();
      },
    }),
    [reset, setInput]
  );

  const inputClasses = hasError
    ? `${styles["input"]} ${styles["invalid-input"]}`
    : styles["input"];

  return (
    <div>
      <div className={styles["input-contianer"]}>
        <div className={styles["title-container"]}>
          <h3>{title}</h3>
          {/* {inputTitle === "Password" && (
          <img
            // src={isShowPassword ? openEyeImage : closedEyeImage}
            alt={isShowPassword ? "open eye" : "closed eye"}
            onClick={(event) => setIsShowPassword((prevIsShow) => !prevIsShow)}
            className={styles["eye-image"]}
          />
        )} */}
        </div>
        {isEdit ? (
          <input
            className={inputClasses}
            type={type}
            onChange={(event) => handleInput(event)}
            onBlur={inputBlurHandler}
            value={value}
          />
        ) : (
          <h3 className={styles.info}>{value}</h3>
        )}
      </div>
      {hasError && <p className={styles["error-text"]}>{errorText}</p>}
    </div>
  );
};

export default UserInfoField;
