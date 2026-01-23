import AuthInput, {
  AuthInputHandle,
} from "../../components/AuthInputs/AuthInput";
import validator from "validator";
import { forgotPassword } from "../../services/userApiServices";
import { useState } from "react";
import { AxiosError } from "axios";
//@ts-ignore
import styles from "./ForgotPasswordPage.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mainBtnClasses = !emailIsValid
    ? `${styles["main-button"]} ${styles["disabled-main-button"]}`
    : styles["main-button"];

  const sendResetEmail = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await forgotPassword(email);
      console.log(res)
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      if (errorMessage) {
        setError(errorMessage);
        // setError("Unable to login. Try again or create an account.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles["header-container"]}>
        <h1 className={styles.header}>Forgot Password</h1>
        <p>Enter your email and a change password link will be sent to you</p>
      </div>
      <div className={styles.container}>
        <AuthInput
          inputTitle="Email"
          inputType="email"
          inputValue={email}
          errorText="Please enter a valid email."
          setIsValid={setEmailIsValid}
          setInput={setEmail}
          checkIsValid={(value) => validator.isEmail(value)}
          //   ref={emailRef}
        />
        <button className={mainBtnClasses} onClick={sendResetEmail}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
