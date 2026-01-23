import AuthInput, {
  AuthInputHandle,
} from "../../components/AuthInputs/AuthInput";
import validator from "validator";
import { forgotPassword } from "../../services/userApiServices";
import { useState } from "react";
import { AxiosError } from "axios";
//@ts-ignore
import styles from "./ResetPasswordPage.module.css";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);

  //   const [formIsValid, setFormIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const MIN_PASSWORD_LENGTH = 7;

  let formIsValid = passwordIsValid && confirmPasswordIsValid;
  
  const mainBtnClasses = !formIsValid
    ? `${styles["main-button"]} ${styles["disabled-main-button"]}`
    : styles["main-button"];

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alert("Make sure the password you entered is the same in both fields.");
    }
    //   setIsLoading(true);
    //   setError("");
    //   try {
    //     const res = await forgotPassword(email);
    //     setIsLoading(false);
    //     console.log(res)
    //   } catch (error) {
    //     const axiosError = error as AxiosError;
    //     console.log(axiosError);
    //     const errorMessage = axiosError.response?.data as string;
    //     if (errorMessage) {
    //       setError(errorMessage);
    //       // setError("Unable to login. Try again or create an account.");
    //     }
    //     setIsLoading(false);
    //   }
  };

  return (
    <div className={styles.page}>
      <div className={styles["header-container"]}>
        <h1 className={styles.header}>Reset Password</h1>
      </div>
      <div className={styles.container}>
        <AuthInput
          inputTitle="Password"
          inputValue={password}
          errorText={`Password must contain at least ${MIN_PASSWORD_LENGTH} characters`}
          setIsValid={setPasswordIsValid}
          setInput={setPassword}
          checkIsValid={(value) => value.length >= MIN_PASSWORD_LENGTH}
          isPassword={true}
          //   ref={emailRef}
        />
        <AuthInput
          inputTitle="Confirm Password"
          inputValue={confirmPassword}
          errorText={`Password must contain at least ${MIN_PASSWORD_LENGTH} characters`}
          setIsValid={setConfirmPasswordIsValid}
          setInput={setConfirmPassword}
          checkIsValid={(value) => value.length >= MIN_PASSWORD_LENGTH}
          isPassword={true}

          //   ref={emailRef}
        />
        <button className={mainBtnClasses} onClick={handlePasswordReset}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
